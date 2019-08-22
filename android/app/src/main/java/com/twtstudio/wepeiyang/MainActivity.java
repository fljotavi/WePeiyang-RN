package com.twtstudio.wepeiyang;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate; // RN-gesture-handler-manually-added
import com.facebook.react.ReactRootView; // RN-gesture-handler-manually-added
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView; // RN-gesture-handler-manually-added

import android.os.Bundle; // Splash-screen-manually-added
import org.devio.rn.splashscreen.SplashScreen; // Splash-screen-manually-added

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this, R.style.SplashScreenTheme); // Splash-screen-manually-added
        super.onCreate(savedInstanceState);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "WePeiyang";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() { // RN-gesture-handler-manually-added
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }
}
