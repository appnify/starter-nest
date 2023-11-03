/**
 * 文件类型
 */
enum FileType {
  /**
   * 文本
   */
  TEXT = 1,
  /**
   * 图片
   */
  IMAGE = 2,
  /**
   * 音频
   */
  AUDIO = 3,
  /**
   * 视频
   */
  VIDEO = 4,
  /**
   * 其他
   */
  OTHER = 5,
}

export function getTypeByMimetype(mimetype: string) {
  const [type] = mimetype.split('/');
  return FileType[type.toLowerCase()] ?? FileType.OTHER;
}
