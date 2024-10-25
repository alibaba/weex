const FILE_ERROR = {
  OPERATION_NOT_PERMITTED: 1300001, // 操作不被允许（例如，filePath 预期传入一个文件而实际传入一个目录）
  NO_SUCH_FILE_OR_DIRECTORY: 1300002, // 文件/目录不存在，或者目标文件路径的上层目录不存在
  INPUT_ERROR: 1300005, // 输入流不可用
  OUTPUT_ERROR: 1300005, // 输出流不可用
  BAD_FILE_DESCRIPTOR: 1300009, // 无效的文件描述符
  PERMISSION_DENIED: 1300013, // 权限错误，文件是只读或只写
  PATH_PERMISSION_DENIED: 1300014, // 传入的路径没有权限
  NOT_DIRECTORY: 1300020, // dirPath 指定路径不是目录，常见于指定的写入路径的上级路径为一个文件的情况
  IS_DIRECTORY: 1300021, // 指定路径是一个目录
  INVALID_ARGUMENT: 1300022, // 无效参数，可以检查length或offset是否越界
  FILE_NAME_TOO_LONG: 1300036, // 文件名过长
  DIRECTORY_NOT_EMPTY: 1300066, // directory not empty
  SYSTEM_ERROR: 1300201, // 系统接口调用失败
  STORAGE_MAXIMUN_SIZE_EXCEEDED: 1300202, // 存储空间不足，或文件大小超出上限（上限100M）
  BASE64_ENCODE_ERROR: 1300203, // 字符编码转换失败（例如 base64 格式错误）
  SDCARD_NOT_MOUNTED: 1300300, // android sdcard 挂载失败
  UNABLE_OPEN_AS_FILETYPE: 1300301, // 无法以fileType打开文件
  CANNOT_ACCESS_FILE_PATH: 1301000, // 目标路径无访问权限（usr目录）
  DATA_TO_WRITE_EMPTY: 1301002, // 写入数据为空
  ILLEGAL_OPERATION_ON_DIRECTORY: 1301003, // 不可对目录进行此操作（例如，指定的 filePath 是一个已经存在的目录）
  ILLEGAL_OPERATION_ON_PACKAGE_DIRECTORY: 1301004, // 不可对代码包目录进行此操作
  FILE_ALREADY_EXISTS: 1301005, // 已有同名文件或目录
  LENGTH_VALUE_OUTOF_RANGE: 1301006, // 传入的 length 不合法
  OFFSET_VALUE_OUTOF_RANGE: 1301007, // 传入的 offset 不合法
  POSITION_VALUE_OUTOF_RANGE: 1301009, // position值越界
  STORE_DERECTORY_EMPTY: 1301100, // store目录为空
  UNZIP_OPEN_FEIL_FAIL: 1301102, // 压缩文件打开失败
  UNZIP_ENTRY_FAIL: 1301103, // 解压单个文件失败
  UNZIP_FAIL: 1301104, // 解压失败
  BROTLI_DECOMPRESS_FAIL: 1301111, // brotli解压失败（例如，指定的 compressionAlgorithm 与文件实际压缩格式不符）
  TEMPFILEPATH_FILE_NOT_EXIST: 1301112, // 指定的 tempFilePath 找不到文件
  FAIL_PERMISSION_DENIED: 1302001, // 指定的 fd 路径没有读权限/没有写权限
  EXCCED_MAX_CONCURRENT_FD_LIMIT: 1302002, // fd数量已达上限
  INVALID_FLAG: 1302003, // 无效的flag
  PERMISSION_DENIED_WHEN_OPEN_USING_FLAG: 1302004, // 无法使用flag标志打开文件
  ARRAY_BUFFER_DOES_NOT_EXISTl: 1302005, // 未传入arrayBuffer
  ARRAY_BUFFER_IS_READONLY: 1302100 // arrayBuffer只读
}

export default FILE_ERROR
