
package com.example.liveswitchbuildexample

import androidx.activity.ComponentActivity
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.liveswitchbuildexample.ui.HomePage
import com.example.liveswitchbuildexample.ui.MeetingPage

enum class AppComponent() {
    Home,
    Meeting
}
@Preview
@Composable
fun AppPreview () {
    App(null)
}
@Composable
fun App (
    activity: ComponentActivity?,
    navController: NavHostController = rememberNavController(),
    modifier: Modifier = Modifier
) {
    NavHost (
        navController = navController,
        startDestination = AppComponent.Home.name
    ) {
        composable(route = AppComponent.Home.name) {
            if (activity != null) {
                HomePage(
                    onJoinClicked = { navController.navigate(AppComponent.Meeting.name)},
                    activity = activity,
                    modifier = modifier
                )
            }
        }
        composable(route = AppComponent.Meeting.name) {
            MeetingPage(
                onLeaveClicked = { navController.popBackStack(AppComponent.Home.name, inclusive = false)},
                modifier = modifier
            )
        }
    }
}
