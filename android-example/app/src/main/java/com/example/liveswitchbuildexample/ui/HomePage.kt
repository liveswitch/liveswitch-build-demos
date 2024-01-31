@file:OptIn(ExperimentalMaterial3Api::class, ExperimentalMaterial3Api::class)

package com.example.liveswitchbuildexample.ui

import android.app.Activity
import android.content.res.Configuration
import android.graphics.Camera
import android.view.View
import android.widget.RelativeLayout
import androidx.activity.ComponentActivity
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.runtime.snapshotFlow
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.layoutId
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import com.example.liveswitchbuildexample.R
import com.example.liveswitchbuildexample.logic.ApplicationLogic
import com.example.liveswitchbuildexample.logic.CameraLocalMedia
import com.example.liveswitchbuildexample.logic.LocalMedia
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

var localMedia:CameraLocalMedia? = null
var cameraList:ArrayList<Pair<String, String>>? = null
var microphoneList:ArrayList<Pair<String, String>>? = null
var speakerList:ArrayList<Pair<String, String>>? = null

@Composable
fun HomePage (
    onJoinClicked: () -> Unit,
    activity: ComponentActivity?,
    modifier: Modifier = Modifier
) {
    var orientation by remember { mutableIntStateOf(Configuration.ORIENTATION_PORTRAIT) }

    val configuration = LocalConfiguration.current

    LaunchedEffect(configuration) {
        snapshotFlow { configuration.orientation }
            .collect { orientation = it }
    }

    when (orientation) {
        Configuration.ORIENTATION_LANDSCAPE -> {
            LandscapeContent(onJoinClicked, modifier)
        }
        else -> {
            PortraitContent(onJoinClicked, modifier)
        }
    }
    activity?.addOnContextAvailableListener {
        afterRender(activity, ApplicationLogic(it))
    }
}

@Preview
@Composable
fun PortraitPreview() {
    PortraitContent(onJoinClicked = {})
}

 fun afterRender(activity: Activity, app: ApplicationLogic) {
     // launch function loop in a different non-blocking thread
     GlobalScope.launch {
         // look to see if the video container has been rendered
         var videoContainer: RelativeLayout? = activity.findViewById(R.id.videoPreview)
         // while the page is rendering, wait for 1 second and then look again
         while (videoContainer == null) {
             delay(1000)
             videoContainer = activity.findViewById(R.id.videoPreview)
         }
         app.startLocalMedia(activity, videoContainer)?.then { mediaObject ->
             if (mediaObject is CameraLocalMedia)
                 localMedia = mediaObject as CameraLocalMedia
             localMedia?.getVideoSourceInputs()?.then { inputs ->
                 inputs.forEach { input ->
                     run {
                         if (cameraList == null) {
                             cameraList = ArrayList()
                         }
                         cameraList!!.add(Pair(input.getName(), input.getId()))
                     }
                 }
             }
             localMedia?.getAudioSourceInputs()?.then { inputs ->
                 inputs.forEach { input ->
                     run {
                         if (microphoneList == null) {
                             microphoneList = ArrayList()
                         }
                         microphoneList!!.add(Pair(input.getName(), input.getId()))
                     }
                 }
             }
         }
     }
}
@Composable
fun LandscapeContent (onJoinClicked: () -> Unit, modifier: Modifier = Modifier) {
    Row {
        Column ( modifier = Modifier.fillMaxWidth(.5f)){
            Logo()
            MeetingInputs(onJoinClicked)
        }
        Column {
            Label(name = "Preview")
            VideoTile(modifier = Modifier.fillMaxSize())
        }
    }
}

@Composable
fun PortraitContent (onJoinClicked: () -> Unit, modifier: Modifier = Modifier) {
    Column (horizontalAlignment = Alignment.CenterHorizontally){
        Logo()
        Label("Preview", modifier = modifier.align(Alignment.Start))
        VideoTile()
        Spacer(modifier = modifier.height(10.dp))
        MeetingInputs(onJoinClicked, modifier)
    }
}


@Composable
fun MeetingInputs(onJoinClicked: () -> Unit, modifier: Modifier = Modifier) {
    var channelId by remember { mutableStateOf("123") }
    var displayName by remember { mutableStateOf("User A") }
    Card (modifier = modifier
        .padding(20.dp)
        .clip(shape = RoundedCornerShape(20.dp))
        .background(Color.White)){
        Row () {
            SelectBox("Camera")
            MenuButton(iconId = R.drawable.video, description = "Camera")
        }
        Row {
            SelectBox("Microphone")
            MenuButton(iconId = R.drawable.audio, description = "Microphone")
        }
        Row {
            SelectBox("Speaker")
        }
        Row {
            TextField(
                value = displayName,
                onValueChange = {displayName = it},
                label = { Text("Display Name") },
                singleLine = true
            )
        }
        Row {
            TextField(
                value = channelId,
                onValueChange = { channelId = it},
                label = { Text("Channel") },
                singleLine = true
            )
        }
        Row(
            horizontalArrangement = Arrangement.Center,
            modifier = modifier.fillMaxWidth()
        ) {
            Button(onClick = {
//                    joinAsync()
                    onJoinClicked()
                },
                colors = ButtonDefaults.buttonColors(
                    contentColor = Color.White,
                    containerColor = colorResource( id = R.color.LSBlue )
                )
            ) {
                Text(text = "Join")
            }
        }
    }
}

@Composable
fun Label(name: String, modifier: Modifier = Modifier) {
    Text(
        text = name,
        modifier = modifier,
        color = colorResource(id = R.color.white),
        fontSize = 24. sp,
        fontWeight = FontWeight.Bold
    )
}

@Composable
fun Logo (modifier: Modifier = Modifier) {
    val image = painterResource(id = R.drawable.logo)
    Image(painter = image, contentDescription = "Logo")
}

@Composable
fun SelectBox (label:String) {
    var isExpanded by remember { mutableStateOf(false) }

    var value by remember { mutableStateOf("") }
    ExposedDropdownMenuBox(expanded = isExpanded, onExpandedChange = {isExpanded = it}) {
        TextField(value = value, onValueChange = {}, readOnly = true, label = { Text(label) },
            trailingIcon = {
                ExposedDropdownMenuDefaults.TrailingIcon(expanded = isExpanded)
            },
            modifier = Modifier.menuAnchor())
        ExposedDropdownMenu(expanded = isExpanded, onDismissRequest = { isExpanded = false }) {
            DropdownMenuItem(text = { Text(text = "option 1") }, onClick = { value = "option 1"; isExpanded= false })
            DropdownMenuItem(text = { Text(text = "option 2") }, onClick = { value = "option 2"; isExpanded= false })
            DropdownMenuItem(text = { Text(text = "option 3") }, onClick = { value = "option 3"; isExpanded= false })
            DropdownMenuItem(text = { Text(text = "option 4") }, onClick = { value = "option 4"; isExpanded= false })
        }
    }
}

@Composable
fun VideoTile (videoHeight: Float = .4f,modifier: Modifier = Modifier) {
    val image = painterResource(id = R.drawable.image_289)
    Column {
        Box (modifier = modifier.layoutId(R.string.localVideo)) {
//            Image(painter = image,
//                contentDescription = "Headshot",
//                Modifier
//                    .fillMaxWidth(.8f)
//                    .fillMaxHeight(videoHeight)
//            )
            LocalPreviewContainer()
            Row (
                modifier = modifier
                    .align(Alignment.BottomCenter)
                    .background(color = colorResource(id = R.color.SpaceCadet60))
                    .matchParentSize()
                    .fillMaxWidth(.8f),
                horizontalArrangement = Arrangement.Center
            ){
                IconButton(iconId = R.drawable.video, description = "Camera")
                Spacer(modifier = Modifier.width(10.dp))
                IconButton(iconId = R.drawable.audio, description = "Microphone")
            }

        }
    }
}

@Composable
fun LocalPreviewContainer() {
    AndroidView(factory = {
         View.inflate(it, R.layout.video_preview, null)
    }, modifier = Modifier.height(250.dp).fillMaxWidth(.8f))
}

@Composable
fun MenuButton (iconId: Int, description: String, modifier: Modifier = Modifier) {
    Button(onClick = { /*TODO*/ },
        modifier= Modifier
            .size(50.dp)
            .padding(3.dp),
        contentPadding = PaddingValues(0.dp),
        shape = CircleShape,
        colors = ButtonDefaults.buttonColors(contentColor = Color.White, containerColor = colorResource( id = R.color.SpaceCadet80 ))
    ) {
        val image = painterResource(id = iconId)
        Icon(painter = image , contentDescription = description, Modifier.size(24. dp))
    }
}

@Composable
fun IconButton (iconId: Int, description: String, modifier: Modifier = Modifier) {
    TextButton(
        onClick = { /*TODO*/ },
        colors = ButtonDefaults.buttonColors(contentColor = Color.White, containerColor = Color.Transparent)
    ) {
        val image = painterResource(id = iconId)
        Icon(painter = image , contentDescription = description, Modifier.size(36. dp))
    }
}
