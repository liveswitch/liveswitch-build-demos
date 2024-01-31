package com.example.liveswitchbuildexample.logic

import android.Manifest
import android.app.Activity
import android.content.Context
import android.content.pm.PackageManager
import android.view.View
import android.widget.RelativeLayout
import android.widget.Toast
import androidx.core.app.ActivityCompat.requestPermissions
import androidx.core.app.ActivityCompat.shouldShowRequestPermissionRationale
import androidx.core.content.ContextCompat
import com.example.liveswitchbuildexample.Config
import fm.liveswitch.Channel
import fm.liveswitch.ChannelClaim
import fm.liveswitch.Client
import fm.liveswitch.Future
import fm.liveswitch.Log
import fm.liveswitch.Promise
import fm.liveswitch.Token
import fm.liveswitch.android.LayoutManager


class ApplicationLogic (context: Context?) {
    // Client and channel
    private var client: Client? = null
    private var channel: Channel? = null
    public var context = context
    private val activity: Activity? = null
    fun getChannel(): Channel? {
        return channel
    }

    fun getClient(): Client? {
        return client
    }

    // Make a registration request.
    fun joinAsync(): Future<Array<Channel?>?>? {
        // Create a client.
        client = Client(Config().gatewayUrl, Config().applicationId)

        // Create a token (do this on the server to avoid exposing your shared secret).
        val token: String = Token.generateClientRegisterToken(
            Config().applicationId,
            client!!.getUserId(),
            client!!.getDeviceId(),
            client!!.getId(),
            null,
            arrayOf<ChannelClaim>(ChannelClaim(Config().channelId)),
            Config().sharedSecret
        )

        // Register client with token.
        return client!!.register(token)
            .then({ channels: Array<Channel> -> onClientRegistered(channels) }) { ex ->
                Log.error(
                    "ERROR: Client unable to register with the gateway.",
                    ex
                )
            }
    }

    // Register the client with token.
    private fun onClientRegistered(channels: Array<Channel>) {
        // Store our channel reference.
        channel = channels[0]
        Log.info("Client " + (client?.getId() ?: "") + " has successfully registered to channel = " + channel!!.getId() + ", Hello World!")
    }

    private var localMedia: LocalMedia<View>? = null
    private var layoutManager: LayoutManager? = null
    private val aecContext = AecContext()

    fun startLocalMedia(activity: Activity, container: RelativeLayout): Future<Any?>? {
        val promise = Promise<Any?>()
        activity.runOnUiThread {

            val requiredPermissions: MutableList<String> = ArrayList(3)

//            if (ContextCompat.checkSelfPermission(
//                    context!!,
//                    Manifest.permission.RECORD_AUDIO
//                ) != PackageManager.PERMISSION_GRANTED
//            ) {
            requiredPermissions.add(Manifest.permission.RECORD_AUDIO)
//            }
            if (ContextCompat.checkSelfPermission(
                    context!!,
                    Manifest.permission.CAMERA
                ) != PackageManager.PERMISSION_GRANTED
            ) {
                requiredPermissions.add(Manifest.permission.CAMERA)
            }
            if (ContextCompat.checkSelfPermission(
                    context!!,
                    Manifest.permission.READ_PHONE_STATE
                ) != PackageManager.PERMISSION_GRANTED
            ) {
                requiredPermissions.add(Manifest.permission.READ_PHONE_STATE)
            }

            if (activity?.shouldShowRequestPermissionRationale(Manifest.permission.RECORD_AUDIO) == true || activity?.shouldShowRequestPermissionRationale(
                    Manifest.permission.CAMERA
                ) == true
                || activity?.shouldShowRequestPermissionRationale(Manifest.permission.READ_PHONE_STATE) == true
            ) {
                Toast.makeText(
                    context,
                    "Access to camera, microphone, storage, and phone call state is required",
                    Toast.LENGTH_SHORT
                ).show()
            }
            activity.requestPermissions(requiredPermissions.toTypedArray<String>(), 1)

                        // Create a new local media with audio and video enabled.
            localMedia = CameraLocalMedia(context, false, false, aecContext) as LocalMedia<View>?

            // Set local media in the layout.
            layoutManager = LayoutManager(container)
            val mediaView = localMedia?.getView()
            layoutManager!!.setLocalView(localMedia?.getView())

            // Start capturing local media.
            localMedia?.start()?.then(
                { localMedia: fm.liveswitch.LocalMedia? ->
                    promise.resolve(
                        localMedia
                    )
                }
            ) { exception: Exception? ->
                promise.reject(
                    exception
                )
            }
        }
        return promise
    }

    fun stopLocalMedia(): Future<Any?>? {
        val promise = Promise<Any?>()
        if (localMedia == null) {
            promise.resolve(null)
        } else {
            // Stop capturing local media.
            localMedia!!.stop().then({ result: fm.liveswitch.LocalMedia? ->
                if (layoutManager != null) {
                    // Remove views from the layout.
                    layoutManager!!.removeRemoteViews()
                    layoutManager!!.unsetLocalView()
                    layoutManager = null
                }
                if (localMedia != null) {
                    localMedia!!.destroy()
                    localMedia = null
                }
                promise.resolve(null)
            }) { exception: Exception? -> promise.reject(exception) }
        }
        return promise
    }
}