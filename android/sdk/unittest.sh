#! /bin/sh
./gradlew clean testDebugUnitTest -PtargetSDK=19
./gradlew jacocoTestReportDebug -PtargetSDK=19
osascript -e 'display notification "Test Done!" with title "Weex Unit Test"'
