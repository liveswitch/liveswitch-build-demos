package com.example.liveswitchbuildexample.ui

import android.content.res.Configuration
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material3.BottomAppBar
import androidx.compose.material3.Icon
import androidx.compose.material3.SmallFloatingActionButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.runtime.snapshotFlow
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.liveswitchbuildexample.R


@Preview
@Composable
fun MeetingPagePreview() {
    MeetingPage({})
}
@Composable
fun MeetingPage (
    onLeaveClicked: () -> Unit,
    modifier: Modifier = Modifier
) {
    var orientation by remember { mutableStateOf(Configuration.ORIENTATION_PORTRAIT) }

    val configuration = LocalConfiguration.current

// If our configuration changes then this will launch a new coroutine scope for it
    LaunchedEffect(configuration) {
        // Save any changes to the orientation value on the configuration object
        snapshotFlow { configuration.orientation }
            .collect { orientation = it }
    }

    when (orientation) {
        Configuration.ORIENTATION_LANDSCAPE -> {
            LandscapeMeetingContent(onLeaveClicked)
        }
        else -> {
            PortraitMeetingContent(onLeaveClicked)
        }
    }
}

@Composable
fun LandscapeMeetingContent (onLeaveClicked: () -> Unit) {
    Row {
        Column ( modifier = Modifier.fillMaxWidth(.5f)){
            SelectBox("Camera")
        }
    }
}

@Composable
fun PortraitMeetingContent (onLeaveClicked: () -> Unit) {
    Column (
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier.fillMaxHeight(1f)
    ){
        Logo()
        Row(verticalAlignment = Alignment.CenterVertically) {
            IconButton(iconId = R.drawable.cog_gear, description = "Settings")
            IconButton(iconId = R.drawable.users, description = "Users")
            Text(text = "4", color = Color.White, fontSize = 24. sp)
            Spacer(modifier = Modifier.fillMaxWidth(.6f))
            LeaveIcon { {} }
        }
        Column(
            modifier = Modifier.wrapContentSize()
        ) {
            VideoTile(videoHeight =.4f)
            VideoTile(videoHeight = .75f)
        }
        Row() {
            MenuButton(iconId = R.drawable.caret_left_md, description = "Previous")
            Spacer(modifier = Modifier.width(40.dp))
            MenuButton(iconId = R.drawable.flip_camera, description = "Switch Camera")
            MenuButton(iconId = R.drawable.video, description = "Camera")
            MenuButton(iconId = R.drawable.audio, description = "Microphone")
            Spacer(modifier = Modifier.width(40.dp))
            MenuButton(iconId = R.drawable.caret_right_md, description = "Next")
        }
        BottomAppBar(containerColor = Color.White) {
            TextButton(
                onClick = { /*TODO*/ },
                modifier = Modifier.fillMaxWidth(.5f)
            ) {
                Text(text = "Gallery")
            }

            TextButton(
                onClick = { /*TODO*/ },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(text = "Chat")
            }
        }
    }
}

@Composable
fun LeaveIcon(onClick: () -> Unit) {
    SmallFloatingActionButton(
        onClick = { onClick() },
        shape = CircleShape,
        contentColor = Color.White,
        containerColor = Color.Red
    ) {
        Icon(Icons.Filled.Close, "Large floating action button")
    }
}


