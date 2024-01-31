package com.example.liveswitchbuildexample.logic

import android.content.Context
import android.view.View
import fm.liveswitch.LayoutScale
import fm.liveswitch.VideoConfig
import fm.liveswitch.VideoSource
import fm.liveswitch.ViewSink
import fm.liveswitch.android.Camera2Source
import fm.liveswitch.android.CameraPreview


class CameraLocalMedia(
    context: Context?,
    disableAudio: Boolean,
    disableVideo: Boolean,
    aecContext: AecContext?
) :
    LocalMedia<View?>(context!!, disableAudio, disableVideo, aecContext) {
    private val viewSink: CameraPreview
    private val videoConfig = VideoConfig(640, 480, 30.0)

    init {
        this.context = context!!
        viewSink = CameraPreview(context, LayoutScale.Contain)
        super.initialize()
    }

    override fun createVideoSource(): VideoSource {
        return Camera2Source(viewSink, videoConfig)
    }

    override fun createViewSink(): ViewSink<View?>? {
        return null
    }

    // Return an Android View for local preview rather than using ViewSink.
    override fun getView(): View {
        return viewSink.view
    }
}