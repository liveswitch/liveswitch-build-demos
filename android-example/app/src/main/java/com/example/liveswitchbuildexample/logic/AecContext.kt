package com.example.liveswitchbuildexample.logic

import fm.liveswitch.AecContext
import fm.liveswitch.AecPipe
import fm.liveswitch.AudioConfig
import fm.liveswitch.AudioSink
import fm.liveswitch.android.AudioRecordSource
import fm.liveswitch.android.AudioTrackSink
import fm.liveswitch.audioprocessing.AecProcessor


class AecContext : AecContext() {
    override fun createOutputMixerSink(audioConfig: AudioConfig): AudioSink {
        return AudioTrackSink(audioConfig)
    }

    override fun createProcessor(): AecPipe {
        val config = AudioConfig(48000, 2)
        return AecProcessor(
            config,
            AudioTrackSink.getBufferDelay(config) + AudioRecordSource.getBufferDelay(config)
        )
    }
}