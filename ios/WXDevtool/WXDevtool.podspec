# coding: utf-8
Pod::Spec.new do |s|

  s.name         = "WXDevtool"
  s.version      = "0.0.1"
  s.summary      = "WXDevtool Source."

  s.description  = <<-DESC
                   WXDevtool Source description
                   DESC

  s.homepage     = "https://github.com/alibaba/weex"
  s.license = {
    :type => 'Copyright',
    :text => <<-LICENSE
           Alibaba-INC copyright
    LICENSE
  }
  s.authors      = {
                     "yangshengtao" =>"yangshengtao1314@163.com"
                   }
  s.platform     = :ios
  s.ios.deployment_target = '7.0'
  s.source =  { :path => '.' }
  s.source_files = 'WXDevTool/Source/**/*.{h,m,mm,c}'

  s.requires_arc = true
  s.prefix_header_file = 'WXDevTool/Source/Supporting Files/TBWXDevTool.pch'
#s.vendored_frameworks = 'WXDevTool.framework'
  s.frameworks = 'Foundation'
  s.dependency 'WeexSDK'
end