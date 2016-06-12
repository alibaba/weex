# coding: utf-8
Pod::Spec.new do |s|


  s.name         = "WeexSDK"
  s.version      = "0.6.0"
  s.summary      = "WeexSDK Source ."

  s.description  = <<-DESC
                   WeexSDK Source description
                   DESC

  s.homepage     = "https://github.com/alibaba/weex"
  s.license = {
    :type => 'Copyright',
    :text => <<-LICENSE
           Alibaba-INC copyright
    LICENSE
  }

  s.platform     = :ios
  s.ios.deployment_target = '7.0'
  s.source =  { :path => '.' }
  s.source_files = 'WeexSDK/Sources/**/*.{h,m,mm,c}'
  s.resources = 'WeexSDK/Resources/weex_config.plist', 'WeexSDK/Resources/main.js'

  s.requires_arc = true
  s.prefix_header_file = 'WeexSDK/Sources/Supporting Files/WeexSDK-Prefix.pch'

#  s.xcconfig = { "GCC_PREPROCESSOR_DEFINITIONS" => '$(inherited) DEBUG=1' }
  s.frameworks = 'AVKit'
  s.dependency 'SocketRocket'
end
