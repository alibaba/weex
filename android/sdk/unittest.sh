#! /bin/sh
./gradlew clean testDebugUnitTest jacocoTestReportDebug -PtargetSDK=19  -Dorg.gradle.daemon=true -Dorg.gradle.parallel=true -Dorg.gradle.jvmargs="-Xmx512m -XX:+HeapDumpOnOutOfMemoryError" -Dfile.encoding=UTF-8
osascript -e 'display notification "Test Done!" with title "Weex Unit Test"'
