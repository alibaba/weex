# !/bin/sh -eu
cd playground
./gradlew assembleDebug :weex_sdk:testDebugUnitTest -PdisableCov=true -PtargetSDK=19 -Dorg.gradle.daemon=true -Dorg.gradle.parallel=true -Dorg.gradle.jvmargs="-Xmx512m -XX:+HeapDumpOnOutOfMemoryError" -Dfile.encoding=UTF-8
COLUMNS=2000 ps -m -o pid,rss,command > ../sdk/build/reports/memdump.txt