const DOCUMENT_EXTENSIONS = [
  'txt', 'text', 'rtf', 'md', 'markdown', 'rst', 'tex', 'latex', 'log', 'csv',
  'tsv', 'tab', 'asc', 'ascii', 'nfo', 'diz', 'me', 'readme', '1st', 'err',
  'out', 'doc', 'docx', 'docm', 'dot', 'dotx', 'dotm', 'odt', 'ott', 'wps',
  'wpd', 'wp', 'pages', 'sxw', 'stw', 'epub', 'mobi', 'azw', 'azw3', 'kfx',
  'fb2', 'djvu', 'lit', 'ibooks', 'cbz', 'cbr', 'pdf', 'xps', 'oxps', 'pub',
  'indd', 'idml', 'qxd', 'pmd', 'html', 'htm', 'xml', 'json', 'yaml', 'yml',
  'toml', 'ini', 'cfg', 'conf', 'properties', 'env', 'sql', 'bib', 'srt', 'vtt',
  'sub', 'ass', 'ssa', 'ics', 'vcf', 'eml', 'msg', 'mht', 'mhtml', 'url',
  'webloc', 'c', 'h', 'cpp', 'hpp', 'java', 'py', 'js', 'ts', 'jsx', 'tsx',
  'php', 'rb', 'go', 'rs', 'swift', 'kt', 'kts', 'cs', 'vb', 'sh', 'bash',
  'ps1', 'bat', 'cmd', 'pl', 'lua', 'r',
];
const DOCUMENT_EXTENSION_SET = new Set(DOCUMENT_EXTENSIONS);
const DOCUMENT_TEXT_INPUTS = new Set([
  'txt', 'text', 'md', 'markdown', 'rst', 'tex', 'latex', 'log', 'csv', 'tsv',
  'tab', 'asc', 'ascii', 'nfo', 'diz', 'me', 'readme', '1st', 'err', 'out',
  'html', 'htm', 'xml', 'json', 'yaml', 'yml', 'toml', 'ini', 'cfg', 'conf',
  'properties', 'env', 'sql', 'bib', 'srt', 'vtt', 'sub', 'ass', 'ssa', 'ics',
  'vcf', 'eml', 'url', 'webloc', 'c', 'h', 'cpp', 'hpp', 'java', 'py', 'js', 'ts',
  'jsx', 'tsx', 'php', 'rb', 'go', 'rs', 'swift', 'kt', 'kts', 'cs', 'vb',
  'sh', 'bash', 'ps1', 'bat', 'cmd', 'pl', 'lua', 'r',
]);
const DOCUMENT_OUTPUTS = new Set(['txt', 'md', 'html', 'rtf', 'docx', 'pdf']);
const DOCUMENT_PARSED_INPUTS = new Set([...DOCUMENT_TEXT_INPUTS, 'docx', 'pdf', 'rtf']);
const PDF_PAGE_EXPORTS = [
  ['pdf-jpgzip', 'JPEG pages in ZIP'],
  ['pdf-pngzip', 'PNG pages in ZIP'],
];
const DOCUMENT_ZIP_FORMAT = ['document-zip', 'ZIP archive'];
const DOCUMENT_FORMATS = [...DOCUMENT_OUTPUTS].map(value => [value, value.toUpperCase()]);
const IMAGE_FORMATS = [
  ['jpg', 'JPG'], ['jpeg', 'JPEG'], ['jpe', 'JPE'], ['jfif', 'JFIF'],
  ['png', 'PNG'], ['gif', 'GIF'], ['webp', 'WebP'], ['bmp', 'BMP'],
  ['tif', 'TIF'], ['tiff', 'TIFF'], ['heic', 'HEIC'], ['heif', 'HEIF'],
  ['avif', 'AVIF'], ['ico', 'ICO'], ['cur', 'CUR'], ['eps', 'EPS'],
  ['pdf', 'PDF'], ['svg', 'SVG'], ['ai', 'AI'], ['cdr', 'CDR'],
  ['wmf', 'WMF'], ['emf', 'EMF'], ['jxl', 'JXL'], ['exr', 'EXR'],
  ['dng', 'DNG'], ['raw', 'RAW'],
];
const AUDIO_INPUT_EXTENSIONS = new Set([
  'mp3', 'wav', 'flac', 'aac', 'm4a', 'm4b', 'ogg', 'oga', 'opus',
  'wma', 'aiff', 'aif', 'aifc', 'alac', 'ape', 'amr', 'ac3', 'dts', 'mka',
  'mp2', 'mpa', 'mpc', 'spx', 'tta', 'wv', 'ofr', 'ofs', 'shn', 'tak', 'awb',
  '3ga', 'gsm', 'vox', 'dss', 'ds2', 'bwf', 'rf64',
  'w64', 'pcm', 'raw', 'au', 'snd', 'voc',
]);
const VIDEO_INPUT_EXTENSIONS = new Set([
  'mp4', 'm4v', 'm4p', 'mov', 'qt', 'mkv', 'mk3d', 'mks', 'avi', 'wmv', 'asf',
  'flv', 'f4v', 'webm', 'ogv', 'ogg', 'mpeg', 'mpg', 'mpe', 'mpv', 'm2v',
  'm2p', 'm2t', 'm2ts', 'mts', 'ts', 'vob', '3gp', '3g2', 'dv', 'ivf', 'h264',
  '264', 'h265', '265', 'hevc', 'av1', 'mod', 'tod', 'dav', 'rec', 'dvr', 'rm',
  'rmvb', 'mxf', 'r3d', 'braw', 'ari', 'crm',
]);
const IMAGE_INPUT_EXTENSIONS = new Set([
  'jpg', 'jpeg', 'jpe', 'jfif', 'png', 'apng', 'gif', 'webp', 'bmp', 'tif',
  'tiff', 'heic', 'heif', 'avif', 'ico', 'cur', 'icns', 'eps', 'pdf', 'svg',
  'ai', 'cdr', 'wmf', 'emf', 'jxl', 'jp2', 'j2k', 'jpf', 'jpx', 'jpm', 'mj2',
  'psd', 'psb', 'xcf', 'ora', 'tga', 'dds', 'pcx', 'ppm', 'pgm', 'pbm', 'pnm',
  'hdr', 'exr', 'dng', 'raw', 'nef', 'cr2', 'cr3', 'arw', 'orf', 'rw2', 'pef',
  'srw', 'raf', '3fr', 'fff', 'iiq', 'k25', 'kdc', 'mos', 'mrw', 'nrw', 'rwl',
  'x3f', 'jxr', 'wdp', 'hdp',
]);
const DATA_INPUT_EXTENSIONS = new Set([
  'csv', 'tsv', 'tab', 'txt', 'json', 'xls', 'xlsx', 'xlsm', 'xlsb', 'ods',
  'fods', 'dif', 'dbf', 'prn', 'slk', 'html', 'htm',
]);
const VIDEO_ONLY_INPUT_EXTENSIONS = new Set([
  'h264', '264', 'h265', '265', 'hevc', 'av1', 'ivf', 'm2v',
]);

const CONVERTERS = {
  image: {
    accept: `image/*,application/pdf,${[...IMAGE_INPUT_EXTENSIONS].map(value => `.${value}`).join(',')}`,
    uploadTypes: 'Common images: JPG/JPEG, PNG/APNG, GIF, WebP, BMP, TIFF, HEIC/HEIF, AVIF, SVG, ICO, PSD, RAW camera files, and more. Browser support varies; some formats may not preview or convert.',
    outputFormats: IMAGE_FORMATS.map(([, label]) => label).concat(['PDF pages in ZIP', 'PNG pages in ZIP', 'ZIP images']),
    formats: IMAGE_FORMATS,
    notes: 'Convert images to common formats, make PDFs from selected images, or bundle images into a ZIP. Upload a PDF here to recompress it or export its pages as JPEG/PNG files in a ZIP. Browser support varies; some image encoders may be unavailable.',
  },
  document: {
    accept: DOCUMENT_EXTENSIONS.map(value => `.${value}`).join(','),
    uploadTypes: 'Common examples: TXT, DOCX, PDF, RTF, Markdown, HTML, CSV/TSV, JSON/YAML, subtitles, calendar/contact files, and source code. The picker accepts supported document file types.',
    outputFormats: ['TXT', 'MD', 'HTML', 'RTF', 'DOCX', 'PDF', 'PDF pages in ZIP', 'PNG pages in ZIP'],
    formats: DOCUMENT_FORMATS,
    notes: 'Upload supported document formats. Export supported text-based files as TXT, MD, HTML, RTF, DOCX, or PDF. PDFs with selectable text can use these exports; PDFs can also be recompressed or exported as JPEG/PNG page images in a ZIP. Every accepted document can be packaged into a ZIP with a selectable compression level, though ZIP may not make already-compressed files smaller.',
  },
  audio: {
    accept: `audio/*,${[...AUDIO_INPUT_EXTENSIONS].map(value => `.${value}`).join(',')}`,
    uploadTypes: 'Audio uploads: MP3, WAV, FLAC, AAC/M4A, OGG/Opus, WMA, AIFF, AMR, AC3, MIDI, tracker files, DAW sessions, and more. Actual decoding depends on the source format and browser FFmpeg support.',
    outputFormats: ['MP3', 'WAV', 'FLAC', 'AAC', 'M4A', 'OGG', 'OGA', 'Opus', 'WMA', 'AIFF', 'AIF', 'AC3', 'MKA', 'MP2', 'MPA', 'AU', 'SND', 'VOC', '3GA', 'BWF', 'RF64', 'W64', 'PCM', 'RAW'],
    formats: [...AUDIO_INPUT_EXTENSIONS].map(value => [value, `${value.toUpperCase()} audio`]),
    notes: 'Upload common audio formats, tracker modules, and DAW session files. Export formats are prioritized by browser FFmpeg support; unsupported targets appear as unavailable in the format selector. Audio bitrate is adjustable for lossy encoders. The FFmpeg engine downloads on first use and may need considerable browser memory.',
  },
  video: {
    accept: `video/*,${[...VIDEO_INPUT_EXTENSIONS].map(value => `.${value}`).join(',')}`,
    uploadTypes: 'Common video: MP4/M4V, MOV, MKV, AVI, WebM, WMV, FLV, MPEG, 3GP, TS/MTS, VOB, OGV, and camera formats. Browser preview and conversion depend on the source codec.',
    outputFormats: [
      'Audio only: MP3', 'WAV', 'FLAC', 'AAC', 'M4A', 'OGG', 'OGA', 'Opus',
      'WMA', 'AIFF', 'AIF', 'AC3', 'MKA', 'MP2', 'MPA', 'AU', 'VOC',
      '3GA', 'BWF', 'RF64', 'W64', 'PCM', 'RAW',
      'MP4', 'MKV', 'AVI', 'MOV', 'WMV', 'FLV', 'WebM', 'MPEG', 'MPG', 'M4V',
      '3GP', '3G2', 'TS', 'MTS', 'M2TS', 'VOB', 'OGV', 'RM', 'RMVB', 'MXF',
      'DV', 'M2V', 'ASF', 'F4V', 'R3D', 'BRAW', 'ARI', 'CRM', 'H264', '264',
      'H265', '265', 'HEVC', 'AV1', 'IVF', 'MOD', 'TOD', 'DAV', 'REC', 'DVR',
    ],
    formats: [
      ['mp3', 'Audio only · MP3'],
      ['wav', 'Audio only · WAV'],
      ['flac', 'Audio only · FLAC'],
      ['aac', 'Audio only · AAC'],
      ['m4a', 'Audio only · M4A (AAC)'],
      ['ogg', 'Audio only · OGG (Vorbis)'],
      ['oga', 'Audio only · OGA (Vorbis)'],
      ['opus', 'Audio only · Opus'],
      ['wma', 'Audio only · WMA'],
      ['aiff', 'Audio only · AIFF'],
      ['aif', 'Audio only · AIF'],
      ['ac3', 'Audio only · AC3'],
      ['mka', 'Audio only · Matroska audio'],
      ['mp2', 'Audio only · MP2'],
      ['mpa', 'Audio only · MPA'],
      ['au', 'Audio only · AU'],
      ['snd', 'Audio only · SND'],
      ['voc', 'Audio only · VOC'],
      ['3ga', 'Audio only · 3GA (AAC)'],
      ['bwf', 'Audio only · BWF (PCM)'],
      ['rf64', 'Audio only · RF64 (PCM)'],
      ['w64', 'Audio only · W64 (PCM)'],
      ['pcm', 'Audio only · PCM (raw)'],
      ['raw', 'Audio only · RAW PCM (headerless)'],
      ['mp4', 'MP4 video'],
      ['mkv', 'MKV video'],
      ['avi', 'AVI video'],
      ['mov', 'MOV video'],
      ['wmv', 'WMV video'],
      ['flv', 'FLV video'],
      ['webm', 'WebM video'],
      ['mpeg', 'MPEG video'],
      ['mpg', 'MPG video'],
      ['m4v', 'M4V video'],
      ['3gp', '3GP video'],
      ['3g2', '3G2 video'],
      ['ts', 'TS video'],
      ['mts', 'MTS video'],
      ['m2ts', 'M2TS video'],
      ['vob', 'VOB video'],
      ['ogv', 'OGV video'],
      ['rm', 'RM video'],
      ['rmvb', 'RMVB video'],
      ['mxf', 'MXF video'],
      ['dv', 'DV video'],
      ['m2v', 'M2V video'],
      ['asf', 'ASF video'],
      ['f4v', 'F4V video'],
      ['r3d', 'R3D video'],
      ['braw', 'BRAW video'],
      ['ari', 'ARI video'],
      ['crm', 'CRM video'],
      ['h264', 'H.264 elementary stream'],
      ['264', '264 elementary stream'],
      ['h265', 'H.265 elementary stream'],
      ['265', '265 elementary stream'],
      ['hevc', 'HEVC elementary stream'],
      ['av1', 'AV1 elementary stream'],
      ['ivf', 'IVF video'],
      ['mod', 'MOD video'],
      ['tod', 'TOD video'],
      ['dav', 'DAV video'],
      ['rec', 'REC video'],
      ['dvr', 'DVR video'],
    ],
    notes: 'Video files can also be exported as audio-only MP3, WAV, FLAC, AAC, M4A, OGG/OGA, Opus, WMA, AIFF/AIF, AC3, MKA, MP2/MPA, AU/SND, VOC, 3GA, BWF, RF64, W64, and raw PCM when the source contains an audio stream. Raw PCM has no metadata header. DAW project files (such as FLP, LOGICX, SESX, and AUP3), MIDI, and formats without an encoder in this browser build are not audio exports. MP4, MKV, AVI, MOV, FLV, WebM, MPEG/MPG, M4V, 3GP/3G2, TS/MTS/M2TS, VOB, M2V, F4V, H264/264, and IVF have video export profiles. Other listed video exports are unavailable in this browser build. Source codecs may also vary; unsupported files will show an FFmpeg error.',
  },
  archive: {
    accept: '',
    uploadTypes: 'ZIP archives to recompress, or any files to bundle together (for example, documents, photos, audio, and video).',
    outputFormats: ['ZIP'],
    formats: [['zip', 'ZIP archive (.zip)']],
    notes: 'Create a ZIP from selected files or recompress an existing ZIP. Compression may not shrink files that are already compressed, such as JPEGs or videos.',
  },
  data: {
    accept: '.csv,.tsv,.tab,.txt,.json,.xls,.xlsx,.xlsm,.xlsb,.ods,.fods,.dif,.dbf,.prn,.slk,.html,.htm,text/csv,text/tab-separated-values,text/plain,application/json,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.oasis.opendocument.spreadsheet',
    uploadTypes: 'Common tables and workbooks: CSV, TSV/TAB, JSON, XLS/XLSX, XLSM/XLSB, ODS, DIF, DBF, and SYLK. Workbook support depends on file structure; styling and formulas may not be preserved.',
    outputFormats: ['CSV', 'JSON', 'XLSX'],
    formats: [
      ['csv', 'CSV (.csv)'],
      ['json', 'JSON (.json)'],
      ['xlsx', 'Excel workbook (.xlsx)'],
    ],
    notes: 'Import common delimited tables and workbook formats using the first worksheet. Export to CSV, JSON, or XLSX. Formulas and workbook styling may not be preserved in CSV or JSON exports.',
  },
};

const IMAGE_FORMAT_MIME = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  jpe: 'image/jpeg',
  jfif: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
  bmp: 'image/bmp',
  tif: 'image/tiff',
  tiff: 'image/tiff',
  avif: 'image/avif',
  jxl: 'image/jxl',
};
const IMAGE_FORMAT_ENCODERS = new Set([
  'jpg', 'jpeg', 'jpe', 'jfif', 'png', 'gif', 'webp', 'bmp', 'tif', 'tiff',
  'ico', 'cur', 'eps', 'pdf', 'svg',
]);
const UNAVAILABLE_IMAGE_FORMATS = new Set(['heic', 'heif', 'ai', 'cdr', 'wmf', 'emf', 'exr', 'dng', 'raw']);
const SUPPORTED_VIDEO_OUTPUTS = new Set([
  'mp4', 'mkv', 'avi', 'mov', 'flv', 'webm', 'mpeg', 'mpg', 'm4v', '3gp',
  '3g2', 'ts', 'mts', 'm2ts', 'vob', 'f4v', 'h264', '264', 'ivf', 'm2v',
  'mp3', 'wav', 'flac', 'aac', 'm4a', 'ogg', 'oga', 'opus', 'wma', 'aiff',
  'aif', 'ac3', 'mka', 'mp2', 'mpa', 'au', 'snd', 'voc', '3ga', 'bwf',
  'rf64', 'w64', 'pcm', 'raw',
]);
const VIDEO_OUTPUT_PROFILES = {
  mp4: { muxer: 'mp4', video: 'libx264', audio: 'aac', mime: 'video/mp4', faststart: true },
  mkv: { muxer: 'matroska', video: 'libx264', audio: 'aac', mime: 'video/x-matroska' },
  avi: { muxer: 'avi', video: 'mpeg4', audio: 'libmp3lame', mime: 'video/x-msvideo' },
  mov: { muxer: 'mov', video: 'libx264', audio: 'aac', mime: 'video/quicktime' },
  flv: { muxer: 'flv', video: 'libx264', audio: 'aac', mime: 'video/x-flv' },
  webm: { muxer: 'webm', video: 'libvpx', audio: 'libvorbis', mime: 'video/webm' },
  mpeg: { muxer: 'mpeg', video: 'mpeg2video', audio: 'mp2', mime: 'video/mpeg' },
  mpg: { muxer: 'mpeg', video: 'mpeg2video', audio: 'mp2', mime: 'video/mpeg' },
  m4v: { muxer: 'mp4', video: 'libx264', audio: 'aac', mime: 'video/mp4' },
  '3gp': { muxer: '3gp', video: 'libx264', audio: 'aac', mime: 'video/3gpp' },
  '3g2': { muxer: '3g2', video: 'libx264', audio: 'aac', mime: 'video/3gpp2' },
  ts: { muxer: 'mpegts', video: 'mpeg2video', audio: 'mp2', mime: 'video/mp2t' },
  mts: { muxer: 'mpegts', video: 'mpeg2video', audio: 'mp2', mime: 'video/mp2t' },
  m2ts: { muxer: 'mpegts', video: 'mpeg2video', audio: 'mp2', mime: 'video/mp2t' },
  vob: { muxer: 'dvd', video: 'mpeg2video', audio: 'mp2', mime: 'video/mpeg' },
  f4v: { muxer: 'mp4', video: 'libx264', audio: 'aac', mime: 'video/mp4' },
  h264: { muxer: 'h264', video: 'libx264', audio: null, mime: 'video/h264' },
  '264': { muxer: 'h264', video: 'libx264', audio: null, mime: 'video/h264' },
  ivf: { muxer: 'ivf', video: 'libvpx', audio: null, mime: 'video/ivf' },
  m2v: { muxer: 'mpeg2video', video: 'mpeg2video', audio: null, mime: 'video/mpeg' },
};
const VIDEO_AUDIO_OUTPUT_PROFILES = {
  mp3: { muxer: 'mp3', codec: 'libmp3lame', mime: 'audio/mpeg', bitrate: true },
  wav: { muxer: 'wav', codec: 'pcm_s16le', mime: 'audio/wav', bitrate: false, estimatedBitrate: 1411 },
  flac: { muxer: 'flac', codec: 'flac', mime: 'audio/flac', bitrate: false, estimatedBitrate: 846 },
  aac: { muxer: 'adts', codec: 'aac', mime: 'audio/aac', bitrate: true },
  m4a: { muxer: 'ipod', codec: 'aac', mime: 'audio/mp4', bitrate: true },
  ogg: { muxer: 'ogg', codec: 'libvorbis', mime: 'audio/ogg', bitrate: true },
  oga: { muxer: 'ogg', codec: 'libvorbis', mime: 'audio/ogg', bitrate: true },
  opus: { muxer: 'ogg', codec: 'libopus', mime: 'audio/ogg', bitrate: true },
  wma: { muxer: 'asf', codec: 'wmav2', mime: 'audio/x-ms-wma', bitrate: true },
  aiff: { muxer: 'aiff', codec: 'pcm_s16be', mime: 'audio/aiff', bitrate: false, estimatedBitrate: 1411 },
  aif: { muxer: 'aiff', codec: 'pcm_s16be', mime: 'audio/aiff', bitrate: false, estimatedBitrate: 1411 },
  ac3: { muxer: 'ac3', codec: 'ac3', mime: 'audio/ac3', bitrate: true },
  mka: { muxer: 'matroska', codec: 'flac', mime: 'audio/x-matroska', bitrate: false, estimatedBitrate: 846 },
  mp2: { muxer: 'mp2', codec: 'mp2', mime: 'audio/mpeg', bitrate: true },
  mpa: { muxer: 'mp2', codec: 'mp2', mime: 'audio/mpeg', bitrate: true },
  au: { muxer: 'au', codec: 'pcm_s16be', mime: 'audio/basic', bitrate: false, estimatedBitrate: 1411 },
  snd: { muxer: 'au', codec: 'pcm_s16be', mime: 'audio/basic', bitrate: false, estimatedBitrate: 1411 },
  voc: { muxer: 'voc', codec: 'pcm_u8', mime: 'audio/x-voc', bitrate: false, estimatedBitrate: 705 },
  '3ga': { muxer: '3gp', codec: 'aac', mime: 'audio/3gpp', bitrate: true },
  bwf: { muxer: 'wav', codec: 'pcm_s16le', mime: 'audio/wav', bitrate: false, estimatedBitrate: 1411 },
  rf64: { muxer: 'rf64', codec: 'pcm_s16le', mime: 'audio/wav', bitrate: false, estimatedBitrate: 1411 },
  w64: { muxer: 'w64', codec: 'pcm_s16le', mime: 'audio/wav', bitrate: false, estimatedBitrate: 1411 },
  pcm: { muxer: 's16le', codec: 'pcm_s16le', mime: 'audio/L16', bitrate: false, estimatedBitrate: 1411 },
  raw: { muxer: 's16le', codec: 'pcm_s16le', mime: 'audio/L16', bitrate: false, estimatedBitrate: 1411 },
};
const VIDEO_AUDIO_FORMATS = new Set(Object.keys(VIDEO_AUDIO_OUTPUT_PROFILES));
const VIDEO_INPUT_DEMUXERS = {
  h264: 'h264',
  '264': 'h264',
  h265: 'hevc',
  '265': 'hevc',
  hevc: 'hevc',
  av1: 'obu',
  m2v: 'mpegvideo',
};

const fileDrop = document.getElementById('fileDrop');
const fileInput = document.getElementById('fileInput');
const outputFormat = document.getElementById('outputFormat');
const convertBtn = document.getElementById('convertBtn');
const converterStatus = document.getElementById('converterStatus');
const converterStatusText = document.getElementById('converterStatusText');
const converterStatusSpinner = converterStatus.querySelector('svg');
const outputPanel = document.getElementById('outputPanel');
const downloadLink = document.getElementById('downloadLink');
const outputDetails = document.getElementById('outputDetails');
const filePreview = document.getElementById('filePreview');
const sourcePreview = document.getElementById('sourcePreview');
const sourceVideoPreview = document.getElementById('sourceVideoPreview');
const sourceAudioPreview = document.getElementById('sourceAudioPreview');
const sourceDocumentPreview = document.getElementById('sourceDocumentPreview');
const sourceFileBadge = document.getElementById('sourceFileBadge');
const sourceFileName = document.getElementById('sourceFileName');
const sourceFileType = document.getElementById('sourceFileType');
const sourceFileSize = document.getElementById('sourceFileSize');
const sourceFileDimensionsLabel = document.getElementById('sourceFileDimensionsLabel');
const sourceFileQualityLabel = document.getElementById('sourceFileQualityLabel');
const sourceFileQuality = document.getElementById('sourceFileQuality');
const sourceFileAspectRatio = document.getElementById('sourceFileAspectRatio');
const sourceFileDimensions = document.getElementById('sourceFileDimensions');
const sourceQualityRow = document.getElementById('sourceQualityRow');
const sourceAspectRatioRow = document.getElementById('sourceAspectRatioRow');
const sourceDurationRow = document.getElementById('sourceDurationRow');
const sourceFileDuration = document.getElementById('sourceFileDuration');
const resizePreview = document.getElementById('resizePreview');
const convertedPreview = document.getElementById('convertedPreview');
const convertedVideoFrame = document.getElementById('convertedVideoFrame');
const convertedVideoPreview = document.getElementById('convertedVideoPreview');
const outputPreviewName = document.getElementById('outputPreviewName');
const outputPreviewType = document.getElementById('outputPreviewType');
const outputPreviewQuality = document.getElementById('outputPreviewQuality');
const outputPreviewAspectRatio = document.getElementById('outputPreviewAspectRatio');
const outputAspectRatioRow = document.getElementById('outputAspectRatioRow');
const outputPreviewDimensions = document.getElementById('outputPreviewDimensions');
const outputPreviewSize = document.getElementById('outputPreviewSize');
const outputPreviewDimensionsRow = document.getElementById('outputPreviewDimensionsRow');
const outputAudioOnlyNotice = document.getElementById('outputAudioOnlyNotice');
const outputPreviewDimensionsLabel = document.getElementById('outputPreviewDimensionsLabel');
const outputDocumentPreview = document.getElementById('outputDocumentPreview');
const convertedAudioPreview = document.getElementById('convertedAudioPreview');
const outputAudioPreviewNote = document.getElementById('outputAudioPreviewNote');
const outputDurationRow = document.getElementById('outputDurationRow');
const outputPreviewDuration = document.getElementById('outputPreviewDuration');
const outputQualityLabel = document.getElementById('outputQualityLabel');
const mediaBitrateLabel = document.getElementById('mediaBitrateLabel');
const formatNotes = document.getElementById('formatNotes');
const acceptedFormats = document.getElementById('acceptedFormats');
const outputFormatHints = document.getElementById('outputFormatHints');
const qualityControl = document.getElementById('qualityControl');
const qualityLabel = document.getElementById('qualityLabel');
const qualityRange = document.getElementById('qualityRange');
const qualityValue = document.getElementById('qualityValue');
const imageSizingControls = document.getElementById('imageSizingControls');
const imageAspectRatio = document.getElementById('imageAspectRatio');
const imageDimensions = document.getElementById('imageDimensions');
const videoSizingControls = document.getElementById('videoSizingControls');
const documentControls = document.getElementById('documentControls');
const documentFont = document.getElementById('documentFont');
const documentFontSize = document.getElementById('documentFontSize');
const documentPageSize = document.getElementById('documentPageSize');
const documentMargins = document.getElementById('documentMargins');
const documentHeadings = document.getElementById('documentHeadings');
const documentCompression = document.getElementById('documentCompression');
const documentCompressionValue = document.getElementById('documentCompressionValue');
const videoAspectRatio = document.getElementById('videoAspectRatio');
const videoDimensions = document.getElementById('videoDimensions');
const videoAudioBitrateControl = document.getElementById('videoAudioBitrateControl');
const resizeControl = document.getElementById('resizeControl');
const compressionControl = document.getElementById('compressionControl');
const bitrateControl = document.getElementById('bitrateControl');
const scriptPromises = new Map();

let activeType = 'image';
let files = [];
let imageInputsReadable = null;
let outputUrl = null;
let ffmpegInstance = null;
let sourcePreviewUrl = null;
let outputPreviewUrl = null;
let previewBlob = null;
let previewRevision = 0;
let previewTimer = null;
let statusTimer = null;
let imageSourceDimensions = null;
let imageSettingsTouched = false;
let videoSourceDimensions = null;
let videoDuration = null;
let audioDuration = null;
let sourceDocumentText = '';
let sourceDocumentHtml = '';
let sourceDocumentFile = null;
let documentPdfPreviewFile = null;
let documentPdfPreviewDimensions = '';
let documentOutputBlob = null;
let documentPreviewRevision = 0;

function extension(name) {
  return name.split('.').pop().toLowerCase();
}

function isPdfFile(file) {
  return file.type === 'application/pdf' || extension(file.name) === 'pdf';
}

function isImageConversionContext() {
  return activeType === 'image';
}

function isPdfPageExport(format) {
  return format === 'pdf-jpgzip' || format === 'pdf-pngzip';
}

function hasPdfInput(selectedFiles = files) {
  return selectedFiles.length > 0 && selectedFiles.every(isPdfFile);
}

function hasImageInputs(selectedFiles = files) {
  return selectedFiles.length > 0 && selectedFiles.every(file =>
    !isPdfFile(file) && (
      file.type.startsWith('image/') || IMAGE_INPUT_EXTENSIONS.has(extension(file.name))
    )
  );
}

function formatBytes(bytes) {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / (1024 ** index)).toFixed(index ? 1 : 0)} ${units[index]}`;
}

function setStatus(message, isError = false, isComplete = false) {
  clearTimeout(statusTimer);
  converterStatusText.textContent = message;
  converterStatus.classList.toggle('hidden', !message);
  converterStatus.classList.toggle('flex', Boolean(message));
  converterStatus.classList.remove(
    'border-emerald-100', 'bg-emerald-50', 'text-emerald-700',
    'border-red-100', 'bg-red-50', 'text-red-700',
    'border-brand-100', 'bg-brand-50', 'text-brand-700'
  );
  if (isError) {
    converterStatus.classList.add('border-red-100', 'bg-red-50', 'text-red-700');
  } else if (isComplete) {
    converterStatus.classList.add('border-emerald-100', 'bg-emerald-50', 'text-emerald-700');
  } else {
    converterStatus.classList.add('border-brand-100', 'bg-brand-50', 'text-brand-700');
  }
  converterStatusSpinner.classList.toggle('hidden', isError || isComplete || !message);
  if (message && (isError || isComplete)) {
    statusTimer = setTimeout(() => {
      converterStatus.classList.add('hidden');
      converterStatus.classList.remove('flex');
    }, 3500);
  }
}

function loadScript(url) {
  if (!scriptPromises.has(url)) {
    scriptPromises.set(url, new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.onload = resolve;
      script.onerror = () => reject(new Error('A conversion library could not be loaded. Check your connection and try again.'));
      document.head.appendChild(script);
    }));
  }
  return scriptPromises.get(url);
}

function updateType(type) {
  activeType = type;
  const config = CONVERTERS[type];
  document.querySelectorAll('.converter-tab').forEach(tab => {
    const active = tab.dataset.type === type;
    tab.setAttribute('aria-selected', String(active));
    tab.classList.toggle('border-brand-600', active);
    tab.classList.toggle('bg-brand-50', active);
    tab.classList.toggle('text-brand-700', active);
    tab.classList.toggle('border-slate-200', !active);
    tab.classList.toggle('bg-white', !active);
    tab.classList.toggle('text-slate-600', !active);
  });
  fileInput.accept = config.accept;
  fileInput.multiple = type === 'archive';
  acceptedFormats.textContent = config.uploadTypes;
  formatNotes.textContent = config.notes;
  filePreview.classList.toggle('lg:grid-cols-2', ['image', 'document', 'video', 'audio'].includes(type));
  qualityControl.classList.toggle('hidden', false);
  imageSizingControls.classList.toggle('hidden', false);
  videoSizingControls.classList.toggle('hidden', type !== 'video');
  documentControls.classList.toggle('hidden', type !== 'document');
  videoAudioBitrateControl.classList.toggle('hidden', type !== 'video');
  resizeControl.classList.add('hidden');
  compressionControl.classList.toggle('hidden', type !== 'archive');
  bitrateControl.classList.toggle('hidden', !['audio', 'video'].includes(type));
  qualityLabel.textContent = 'Image quality if re-encoded';
  outputQualityLabel.textContent = 'Quality';
  sourceFileDimensionsLabel.textContent = 'Dimensions';
  outputPreviewDimensionsLabel.textContent = 'Dimensions';
  mediaBitrateLabel.textContent = 'Media bitrate';
  imageSourceDimensions = null;
  videoSourceDimensions = null;
  videoDuration = null;
  audioDuration = null;
  imageSettingsTouched = false;
  sourceDocumentText = '';
  sourceDocumentHtml = '';
  sourceDocumentFile = null;
  documentPdfPreviewFile = null;
  documentPdfPreviewDimensions = '';
  documentOutputBlob = null;
  documentPreviewRevision += 1;
  imageDimensions.disabled = true;
  imageDimensions.replaceChildren(new Option('Upload a file to choose dimensions', ''));
  imageAspectRatio.value = 'original';
  videoAspectRatio.value = 'original';
  videoDimensions.disabled = true;
  videoDimensions.replaceChildren(new Option('Upload a video to choose dimensions', ''));
  files = [];
  imageInputsReadable = null;
  syncFileControls();
  populateFormats();
  clearOutput();
  clearFilePreview();
  setStatus('');
}

function renderFormatBadges(container, formats, className) {
  container.replaceChildren(...formats.map(format => {
    const badge = document.createElement('span');
    const isVideoFormat = typeof format === 'object';
    const text = isVideoFormat ? format.text : format;
    const badgeClass = isVideoFormat
      ? format.available ? className : 'border-slate-200 bg-white text-slate-600'
      : format.includes('(unavailable)')
        ? 'border-slate-200 bg-slate-100 text-slate-500'
        : className;
    badge.className = `rounded-full border px-2.5 py-1 text-xs font-semibold ${badgeClass}`;
    badge.textContent = text;
    return badge;
  }));
}

function outputFormatName(type, value, label) {
  if (value === 'pdf-compressed') return 'Compressed PDF';
  if (value === 'pdf-jpgzip') return 'JPEG pages in ZIP';
  if (value === 'pdf-pngzip') return 'PNG pages in ZIP';
  if (value === 'image-zip') return 'Images in ZIP';
  if (value === 'document-zip') return 'ZIP archive';
  return value.toUpperCase();
}

function outputFormatCategory(type, value) {
  if (type === 'video') return VIDEO_AUDIO_FORMATS.has(value) ? 'Audio' : 'Video';
  return '';
}

function updateImageControls() {
  const pdfInput = ['image', 'document'].includes(activeType) && hasPdfInput();
  const imageInput = isImageConversionContext() && imageInputsReadable === true;
  const imageZip = imageInput && outputFormat.value === 'image-zip';
  const imagePdf = imageInput && outputFormat.value === 'pdf';
  const multiImagePdf = imagePdf && files.length > 1;
  const showZipCompression = activeType === 'archive'
    || outputFormat.value === 'image-zip'
    || activeType === 'document' && outputFormat.value === 'document-zip'
    || pdfInput;
  const showQuality = activeType === 'image' || pdfInput;
  imageSizingControls.classList.toggle('hidden', activeType !== 'image' || imageZip || multiImagePdf);
  resizeControl.classList.toggle('hidden', !(
    pdfInput
    || multiImagePdf
  ));
  compressionControl.classList.toggle('hidden', !showZipCompression);
  qualityControl.classList.toggle('hidden', activeType !== 'image' && !showQuality);
  document.getElementById('pdfQualityHint').classList.toggle('hidden', !pdfInput);
  documentControls.classList.toggle('hidden', activeType !== 'document' || imageInput);
  qualityLabel.textContent = pdfInput ? 'PDF page quality' : 'Image quality if re-encoded';
  document.getElementById('resizeLabel').textContent = pdfInput ? 'Maximum PDF page width (pixels)' : 'Maximum width (pixels)';
}

const OUTPUT_FORMAT_PRIORITY = {
  image: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif', 'svg', 'pdf', 'bmp', 'tif', 'tiff'],
  document: ['docx', 'pdf-compressed', 'pdf', 'txt', 'md', 'html', 'rtf'],
  audio: [
    'mp3', 'wav', 'flac', 'aac', 'm4a', 'ogg', 'oga', 'opus', 'wma', 'aiff',
    'aif', 'ac3', 'mka', 'mp2', 'mpa', 'au', 'snd', 'voc', '3ga', 'bwf',
    'rf64', 'w64', 'pcm', 'raw',
  ],
  video: [
    'mp4', 'mp3', 'wav', 'mov', 'mkv', 'avi', 'webm', 'm4v', 'aac', 'm4a',
    'flac', 'ogg', 'opus', 'mpeg', 'mpg', '3gp', '3g2', 'flv',
  ],
  archive: ['zip'],
  data: ['xlsx', 'csv', 'json'],
};

function formatsForCurrentInput() {
  if (!files.length) {
    if (activeType === 'image') return [...IMAGE_FORMATS, ['pdf', 'PDF'], ['image-zip', 'Images in ZIP']];
    if (activeType === 'document') return [...CONVERTERS.document.formats, DOCUMENT_ZIP_FORMAT];
    return CONVERTERS[activeType].formats;
  }
  if (activeType === 'image') {
    if (hasPdfInput()) {
      return [
        ...IMAGE_FORMATS.filter(([value]) => value !== 'pdf' && imageFormatAvailable(value)),
        ['pdf', 'PDF'],
        ['pdf-compressed', 'Compressed PDF'],
        ...PDF_PAGE_EXPORTS,
      ];
    }
    if (files.length > 1) {
      return imageInputsReadable === true
        ? [['pdf', 'PDF'], ['image-zip', 'Images in ZIP']]
        : [['image-zip', 'Images in ZIP']];
    }
    if (imageInputsReadable !== true) return [['image-zip', 'Images in ZIP']];
    return [
      ...IMAGE_FORMATS.filter(([value]) => value !== 'pdf' && imageFormatAvailable(value)),
      ['pdf', 'PDF'],
      ['image-zip', 'Images in ZIP'],
    ];
  }
  if (activeType === 'document') {
    if (hasPdfInput()) {
      return [
        ...DOCUMENT_FORMATS,
        ['pdf-compressed', 'Compressed PDF'],
        ...PDF_PAGE_EXPORTS,
        DOCUMENT_ZIP_FORMAT,
      ];
    }
    return [
      ...(DOCUMENT_PARSED_INPUTS.has(extension(files[0].name)) ? DOCUMENT_FORMATS : []),
      DOCUMENT_ZIP_FORMAT,
    ];
  }
  if (activeType === 'video') {
    const sourceExtension = extension(files[0].name);
    const hasAudio = !VIDEO_ONLY_INPUT_EXTENSIONS.has(sourceExtension);
    return CONVERTERS.video.formats.filter(([value]) => (
      videoFormatAvailable(value)
      && (hasAudio || !VIDEO_AUDIO_FORMATS.has(value))
    ));
  }
  if (activeType === 'audio') {
    return isAudioFile(files[0])
      ? CONVERTERS.audio.formats.filter(([value]) => Boolean(VIDEO_AUDIO_OUTPUT_PROFILES[value]))
      : [];
  }
  if (activeType === 'data') {
    return DATA_INPUT_EXTENSIONS.has(extension(files[0].name))
      ? CONVERTERS.data.formats
      : [];
  }
  return CONVERTERS[activeType].formats;
}

function preferredDocumentFormat(file) {
  const sourceExtension = extension(file.name);
  const supportedValues = new Set(formatsForCurrentInput().map(([value]) => value));
  if (supportedValues.has(sourceExtension)) return sourceExtension;
  const aliases = {
    text: 'txt',
    markdown: 'md',
    rst: 'txt',
    tex: 'txt',
    latex: 'txt',
    htm: 'html',
    yaml: 'txt',
    yml: 'txt',
    toml: 'txt',
    ini: 'txt',
    cfg: 'txt',
    conf: 'txt',
    properties: 'txt',
    env: 'txt',
    sql: 'txt',
    bib: 'txt',
  };
  const alias = aliases[sourceExtension];
  if (alias && supportedValues.has(alias)) return alias;
  if (DOCUMENT_PARSED_INPUTS.has(sourceExtension) && supportedValues.has('docx')) return 'docx';
  return supportedValues.has('document-zip') ? 'document-zip' : supportedValues.values().next().value || '';
}

function populateFormats(preserveSelection = false) {
  const previousValue = preserveSelection ? outputFormat.value : '';
  const formats = formatsForCurrentInput();
  const optionFormats = (activeType === 'image'
    ? formats.map(([value, label]) => [
      value,
      label,
      IMAGE_FORMATS.some(([imageFormat]) => imageFormat === value) && !imageFormatAvailable(value),
    ])
    : activeType === 'video'
      ? formats.map(([value, label]) => [value, label, !videoFormatAvailable(value)])
      : activeType === 'audio'
        ? formats.map(([value, label]) => [value, label, !VIDEO_AUDIO_OUTPUT_PROFILES[value]])
        : formats)
    .map((format, index) => ({ format, index }))
    .sort((left, right) => {
      const leftUnavailable = Boolean(left.format[2]);
      const rightUnavailable = Boolean(right.format[2]);
      if (leftUnavailable !== rightUnavailable) return Number(leftUnavailable) - Number(rightUnavailable);
      const priority = OUTPUT_FORMAT_PRIORITY[activeType] || [];
      const leftRank = priority.indexOf(left.format[0]);
      const rightRank = priority.indexOf(right.format[0]);
      const leftPriority = leftRank === -1 ? priority.length : leftRank;
      const rightPriority = rightRank === -1 ? priority.length : rightRank;
      return leftPriority - rightPriority || left.index - right.index;
    })
    .map(({ format }) => format);
  outputFormat.replaceChildren(...optionFormats.map(([value, label, unavailable]) => {
    const option = document.createElement('option');
    option.value = value;
    const formatName = outputFormatName(activeType, value, label);
    const category = outputFormatCategory(activeType, value);
    option.textContent = `${formatName}${category ? ` · ${category}` : ''}${unavailable ? ' (Unavailable)' : ''}`;
    option.disabled = Boolean(unavailable);
    return option;
  }));
  if (!optionFormats.length) {
    outputFormat.add(new Option(files.length ? 'No supported exports for this file' : 'No export formats available', ''));
    outputFormat.disabled = true;
  } else {
    outputFormat.disabled = false;
  }
  const hintFormats = optionFormats.map(([value, label, unavailable]) => ({
    text: outputFormatName(activeType, value, label),
    available: !unavailable,
  }));
  renderFormatBadges(
    outputFormatHints,
    files.length
      ? hintFormats.filter(format => format.available)
      : hintFormats,
    'border-emerald-200 bg-emerald-50 text-emerald-800',
  );
  updateImageControls();
  if (preserveSelection && optionFormats.some(([value]) => value === previousValue)) {
    outputFormat.value = previousValue;
  } else if (isImageConversionContext() && files.length) {
    const originalExtension = extension(files[0].name);
    const matchingOption = [...outputFormat.options].find(option => option.value === originalExtension && !option.disabled);
    outputFormat.value = hasPdfInput()
      ? 'pdf'
      : files.length > 1
        ? imageInputsReadable === false ? 'image-zip' : 'pdf'
        : matchingOption ? matchingOption.value : outputFormat.options[0]?.value || '';
  } else if (activeType === 'video' && files.length && isVideoFile(files[0])) {
    const originalFormat = extension(files[0].name);
    outputFormat.value = videoFormatAvailable(originalFormat) ? originalFormat : 'mp4';
  } else if (activeType === 'video') {
    outputFormat.value = 'mp4';
  } else if (activeType === 'document') {
    outputFormat.value = files.length ? preferredDocumentFormat(files[0]) : 'docx';
  }
  if (!outputFormat.value && outputFormat.options.length) {
    outputFormat.value = outputFormat.options[0].value;
  }
  convertBtn.disabled = files.length === 0 || !outputFormat.value;
  updateImageControls();
}

function videoFormatAvailable(format) {
  return SUPPORTED_VIDEO_OUTPUTS.has(format);
}

function imageFormatAvailable(format) {
  if (UNAVAILABLE_IMAGE_FORMATS.has(format)) return false;
  if (IMAGE_FORMAT_ENCODERS.has(format)) return true;
  const mime = IMAGE_FORMAT_MIME[format];
  if (!mime) return false;
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  try {
    return canvas.toDataURL(mime).startsWith(`data:${mime}`);
  } catch (error) {
    return false;
  }
}

function clearOutput() {
  outputPanel.classList.add('hidden');
  if (outputUrl) URL.revokeObjectURL(outputUrl);
  outputUrl = null;
  downloadLink.removeAttribute('href');
}

function clearFilePreview() {
  clearTimeout(previewTimer);
  previewRevision += 1;
  documentPreviewRevision += 1;
  previewBlob = null;
  documentOutputBlob = null;
  sourceDocumentText = '';
  sourceDocumentHtml = '';
  sourceDocumentFile = null;
  documentPdfPreviewFile = null;
  documentPdfPreviewDimensions = '';
  sourceQualityRow.classList.add('hidden');
  sourceAspectRatioRow.classList.add('hidden');
  outputAspectRatioRow.classList.add('hidden');
  outputPreviewDimensionsRow.classList.remove('hidden');
  outputAudioOnlyNotice.classList.add('hidden');
  sourceFileQuality.textContent = '';
  sourceFileQuality.title = '';
  sourceFileAspectRatio.textContent = '';
  sourceFileDuration.textContent = '';
  sourceVideoPreview.onloadedmetadata = null;
  sourceVideoPreview.onerror = null;
  sourceAudioPreview.onloadedmetadata = null;
  sourceAudioPreview.onerror = null;
  if (sourcePreviewUrl) URL.revokeObjectURL(sourcePreviewUrl);
  if (outputPreviewUrl) URL.revokeObjectURL(outputPreviewUrl);
  sourcePreviewUrl = null;
  outputPreviewUrl = null;
  sourcePreview.removeAttribute('src');
  sourceVideoPreview.pause();
  sourceVideoPreview.removeAttribute('src');
  sourceVideoPreview.load();
  sourceVideoPreview.classList.add('hidden');
  sourceAudioPreview.pause();
  sourceAudioPreview.removeAttribute('src');
  sourceAudioPreview.load();
  sourceAudioPreview.classList.add('hidden');
  convertedPreview.removeAttribute('src');
  convertedPreview.classList.remove('hidden');
  convertedVideoPreview.pause();
  convertedVideoPreview.controls = false;
  convertedVideoPreview.removeAttribute('src');
  convertedVideoPreview.load();
  convertedAudioPreview.pause();
  convertedAudioPreview.removeAttribute('src');
  convertedAudioPreview.load();
  convertedAudioPreview.classList.add('hidden');
  outputAudioPreviewNote.classList.add('hidden');
  convertedVideoFrame.classList.add('hidden');
  convertedVideoPreview.classList.add('hidden');
  sourceDocumentPreview.replaceChildren();
  sourceDocumentPreview.classList.add('hidden');
  outputDocumentPreview.replaceChildren();
  outputDocumentPreview.classList.add('hidden');
  sourcePreview.classList.remove('hidden');
  sourceVideoPreview.classList.add('hidden');
  convertedPreview.classList.remove('hidden');
  sourcePreview.classList.add('hidden');
  sourceFileBadge.classList.remove('hidden');
  sourceDurationRow.classList.add('hidden');
  outputDurationRow.classList.add('hidden');
  filePreview.classList.add('hidden');
  resizePreview.classList.add('hidden');
  filePreview.classList.toggle('lg:grid-cols-2', ['image', 'document', 'video', 'audio'].includes(activeType));
}

function syncFileControls() {
  convertBtn.disabled = files.length === 0;
  populateFormats();
  if (activeType === 'audio') configureMediaBitrate(false);
  if (activeType === 'video') updateVideoOutputControls();
}

function acceptFiles(fileList) {
  const selected = Array.from(fileList || []);
  if (!selected.length) return;
  if (activeType !== 'archive' && selected.length > 1) {
    setStatus('Choose one file at a time in this converter. Use the ZIP section to process multiple files together.', true);
    return;
  }
  if (activeType === 'audio' && selected.some(file => !isAudioFile(file))) {
    setStatus('Choose an audio file in a supported audio format. Video files are not accepted in the Audio converter.', true);
    return;
  }
  if (activeType === 'video' && selected.some(file => !isVideoFile(file))) {
    setStatus('Choose a video file in the Video converter.', true);
    return;
  }
  if (activeType === 'image') {
    const pdfSelected = selected.some(isPdfFile);
    if (selected.some(file => !isPdfFile(file)
      && !file.type.startsWith('image/')
      && !IMAGE_INPUT_EXTENSIONS.has(extension(file.name)))) {
      setStatus('Choose image files or one PDF in the Images converter.', true);
      return;
    }
    if (pdfSelected && (selected.length !== 1 || selected.some(file => !isPdfFile(file)))) {
      setStatus('Select one PDF at a time, without other files.', true);
      return;
    }
  }
  if (activeType === 'document' && selected.length > 1) {
    setStatus('Choose one document at a time in the Documents converter.', true);
    return;
  }
  if (activeType === 'document' && selected.some(file => !DOCUMENT_EXTENSION_SET.has(extension(file.name)))) {
    setStatus('Choose a supported document file in the Documents converter.', true);
    return;
  }
  files = activeType === 'archive' || activeType === 'image' && selected.length > 1
    ? selected
    : selected.slice(0, 1);
  if (activeType === 'image') {
    imageSettingsTouched = false;
    imageInputsReadable = null;
  }
  syncFileControls();
  clearOutput();
  setStatus('Reading file details...');
  renderFilePreview();
}

function isAudioFile(file) {
  if (file.type.startsWith('video/')) return false;
  return file.type.startsWith('audio/') || AUDIO_INPUT_EXTENSIONS.has(extension(file.name));
}

function isVideoFile(file) {
  return file.type.startsWith('video/') || VIDEO_INPUT_EXTENSIONS.has(extension(file.name));
}

async function renderFilePreview() {
  clearFilePreview();
  if (!files.length) return;
  const selectedFiles = files;
  const file = files[0];
  const fileExtension = extension(file.name);
  const isImage = file.type.startsWith('image/')
    || file.type === 'application/pdf'
    || IMAGE_INPUT_EXTENSIONS.has(fileExtension);

  sourceFileName.textContent = files.length > 1 ? `${file.name} and ${files.length - 1} more` : file.name;
  if (isImageConversionContext()) {
    sourceFileDimensionsLabel.textContent = 'Dimensions';
    outputPreviewDimensionsLabel.textContent = 'Dimensions';
    outputQualityLabel.textContent = 'Quality';
    sourceFileQualityLabel.textContent = 'Quality';
  }
  sourceFileType.textContent = formatFileType(file, fileExtension);
  sourceFileSize.textContent = files.length > 1
    ? `${formatBytes(files.reduce((total, selected) => total + selected.size, 0))} total`
    : formatBytes(file.size);
  sourceFileDimensions.textContent = 'Not available for this file type';
  sourceFileBadge.textContent = fileExtension || 'FILE';
  filePreview.classList.remove('hidden');

  if (activeType === 'video' && isVideoFile(file)) {
    renderVideoPreview(file);
    return;
  }

  if (activeType === 'audio' && isAudioFile(file)) {
    renderAudioPreview(file);
    return;
  }

  if (activeType === 'document') {
    await renderDocumentPreview(file);
    return;
  }

  if (!isImage) {
    setStatus('File details ready.', false, true);
    return;
  }

  try {
    const bitmap = await loadImage(file);
    if (['tif', 'tiff', 'heic', 'heif', 'pdf'].includes(fileExtension)) {
      const previewCanvas = document.createElement('canvas');
      previewCanvas.width = bitmap.width;
      previewCanvas.height = bitmap.height;
      previewCanvas.getContext('2d').drawImage(bitmap, 0, 0);
      const previewBlob = await canvasBlob(previewCanvas, 'image/png');
      sourcePreviewUrl = URL.createObjectURL(previewBlob);
    } else {
      sourcePreviewUrl = URL.createObjectURL(file);
    }
    sourcePreview.src = sourcePreviewUrl;
    sourcePreview.classList.remove('hidden');
    sourceFileBadge.classList.add('hidden');
    sourceFileDimensions.textContent = `${bitmap.width} × ${bitmap.height} px`;
    if (isImageConversionContext()) {
      imageSourceDimensions = { width: bitmap.width, height: bitmap.height };
      sourceFileAspectRatio.textContent = aspectRatioLabel(bitmap.width, bitmap.height);
      sourceFileQuality.textContent = 'Original (unchanged)';
      sourceQualityRow.classList.remove('hidden');
      sourceAspectRatioRow.classList.remove('hidden');
      imageAspectRatio.value = 'original';
      populateImageDimensions();
    }
    bitmap.close();
    if (isImageConversionContext()) {
      for (const selectedFile of selectedFiles.slice(1)) {
        const additionalBitmap = await loadImage(selectedFile);
        additionalBitmap.close();
        if (files !== selectedFiles || !isImageConversionContext()) return;
      }
      imageInputsReadable = true;
      populateFormats();
      scheduleImagePreview(0);
    }
    else setStatus('File preview ready.', false, true);
  } catch (error) {
    if (isImageConversionContext() && files === selectedFiles) {
      imageInputsReadable = false;
      populateFormats();
      renderImageActionPreview();
      setStatus('This image cannot be decoded here; you can still bundle the original file in a ZIP.', true);
    }
    sourceFileDimensions.textContent = 'Could not read image dimensions';
    if (!isImageConversionContext() || files !== selectedFiles) {
      setStatus(error.message || 'Could not preview this image.', true);
    }
  }
}

function renderVideoPreview(file) {
  videoSourceDimensions = null;
  videoDuration = null;
  videoAspectRatio.value = 'original';
  videoDimensions.disabled = true;
  videoDimensions.replaceChildren(new Option('Upload a video to choose dimensions', ''));
  sourcePreview.classList.add('hidden');
  sourceVideoPreview.classList.remove('hidden');
  sourceFileBadge.classList.add('hidden');
  sourceFileQualityLabel.textContent = 'Average bitrate';
  sourceFileQuality.textContent = 'Not available';
  sourceQualityRow.classList.remove('hidden');
  sourceAspectRatioRow.classList.remove('hidden');
  sourceDurationRow.classList.remove('hidden');
  sourcePreviewUrl = URL.createObjectURL(file);
  sourceVideoPreview.src = sourcePreviewUrl;
  sourceVideoPreview.onloadedmetadata = () => {
    if (files[0] !== file) return;
    videoDuration = Number.isFinite(sourceVideoPreview.duration) ? sourceVideoPreview.duration : 0;
    sourceFileQuality.textContent = videoDuration > 0
      ? `${((file.size * 8) / videoDuration / 1000).toFixed(0)} kbps overall`
      : 'Not available';
    sourceFileQuality.title = 'Average bitrate for the complete source file, including audio and container data.';
    sourceFileDuration.textContent = formatDuration(videoDuration);
    videoSourceDimensions = {
      width: sourceVideoPreview.videoWidth,
      height: sourceVideoPreview.videoHeight,
    };
    renderVideoOutputPreview();
    if (!videoSourceDimensions.width || !videoSourceDimensions.height) {
      videoSourceDimensions = null;
      sourceFileDimensions.textContent = 'Could not read the video dimensions';
      sourceAspectRatioRow.classList.add('hidden');
      setStatus('Could not read the video dimensions.', true);
      return;
    }
    sourceFileDimensions.textContent = `${videoSourceDimensions.width} × ${videoSourceDimensions.height} px`;
    sourceFileAspectRatio.textContent = aspectRatioLabel(videoSourceDimensions.width, videoSourceDimensions.height);
    filePreview.classList.add('lg:grid-cols-2');
    videoSizingControls.classList.remove('hidden');
    resizeControl.classList.add('hidden');
    videoAudioBitrateControl.classList.remove('hidden');
    qualityLabel.textContent = 'Video quality';
    outputQualityLabel.textContent = 'Output video bitrate';
    document.getElementById('resizeLabel').textContent = 'Maximum width (pixels)';
    updateVideoOutputControls();
    populateVideoDimensions();
    renderVideoOutputPreview();
    setStatus('Video preview ready.', false, true);
  };
  sourceVideoPreview.onerror = () => {
    if (files[0] !== file) return;
    sourceVideoPreview.classList.add('hidden');
    sourceFileBadge.classList.remove('hidden');
    renderVideoOutputPreview();
    setStatus('This browser cannot preview this video. You can still try converting it; crop and dimension controls need a readable preview.', true);
  };
  sourceVideoPreview.load();
}

function configureMediaBitrate(video) {
  const mediaBitrate = document.getElementById('mediaBitrate');
  const options = video
    ? [
      ['250', '250 kbps / very compact'],
      ['400', '400 kbps / compact'],
      ['600', '600 kbps'],
      ['800', '800 kbps'],
      ['1000', '1 Mbps'],
      ['1500', '1.5 Mbps / balanced'],
      ['2000', '2 Mbps'],
      ['2500', '2.5 Mbps'],
      ['3000', '3 Mbps / high quality'],
      ['4000', '4 Mbps'],
      ['5000', '5 Mbps'],
      ['6000', '6 Mbps'],
      ['8000', '8 Mbps'],
      ['10000', '10 Mbps'],
      ['12000', '12 Mbps'],
      ['16000', '16 Mbps'],
      ['20000', '20 Mbps'],
      ['25000', '25 Mbps / maximum'],
    ]
    : [
      ['64', '64 kbps / smallest'],
      ['96', '96 kbps / compact'],
      ['112', '112 kbps'],
      ['128', '128 kbps'],
      ['160', '160 kbps / balanced'],
      ['192', '192 kbps'],
      ['224', '224 kbps'],
      ['256', '256 kbps / high quality'],
      ['320', '320 kbps / maximum'],
    ];
  const previousValue = mediaBitrate.value;
  mediaBitrate.replaceChildren(...options.map(([value, label]) => new Option(label, value)));
  mediaBitrate.value = options.some(([value]) => value === previousValue)
    ? previousValue
    : video ? '1500' : '160';
  outputQualityLabel.textContent = video ? 'Output video bitrate' : 'Output audio bitrate';
  mediaBitrateLabel.textContent = video ? 'Target video bitrate' : 'Target audio bitrate';
}

function renderAudioPreview(file) {
  audioDuration = null;
  sourceFileDimensionsLabel.textContent = 'Audio details';
  sourceFileQualityLabel.textContent = 'Average bitrate';
  sourceFileQuality.textContent = 'Reading audio metadata...';
  sourceFileDimensions.textContent = 'Audio playback';
  sourceDurationRow.classList.remove('hidden');
  sourceFileDuration.textContent = 'Reading duration...';
  sourceQualityRow.classList.remove('hidden');
  sourcePreview.classList.add('hidden');
  sourceVideoPreview.classList.add('hidden');
  sourceDocumentPreview.classList.add('hidden');
  sourceFileBadge.classList.add('hidden');
  sourcePreviewUrl = URL.createObjectURL(file);
  sourceAudioPreview.src = sourcePreviewUrl;
  sourceAudioPreview.classList.remove('hidden');
  filePreview.classList.add('lg:grid-cols-2');
  sourceAudioPreview.onloadedmetadata = () => {
    if (files[0] !== file || activeType !== 'audio') return;
    audioDuration = Number.isFinite(sourceAudioPreview.duration) ? sourceAudioPreview.duration : 0;
    sourceFileDuration.textContent = formatDuration(audioDuration);
    sourceFileQuality.textContent = audioDuration > 0
      ? `${((file.size * 8) / audioDuration / 1000).toFixed(0)} kbps overall`
      : 'Not available';
    sourceFileQuality.title = 'Average bitrate for the complete source file, including container data.';
    renderAudioOutputPreview();
    setStatus('Audio preview ready.', false, true);
  };
  sourceAudioPreview.onerror = () => {
    if (files[0] !== file || activeType !== 'audio') return;
    sourceFileDuration.textContent = 'Not available';
    sourceFileQuality.textContent = 'Not available';
    sourceFileDimensions.textContent = 'This browser cannot play the source audio.';
    renderAudioOutputPreview();
    setStatus('This browser cannot play this audio file. You can still try converting it if FFmpeg supports its codec.', true);
  };
  renderAudioOutputPreview();
  sourceAudioPreview.load();
}

function renderAudioOutputPreview() {
  if (activeType !== 'audio' || !files.length) return;
  const file = files[0];
  const profile = VIDEO_AUDIO_OUTPUT_PROFILES[outputFormat.value];
  if (!profile) return;
  convertedPreview.classList.add('hidden');
  convertedVideoFrame.classList.add('hidden');
  convertedVideoPreview.classList.add('hidden');
  outputDocumentPreview.classList.add('hidden');
  outputAudioOnlyNotice.classList.add('hidden');
  convertedAudioPreview.classList.remove('hidden');
  outputAudioPreviewNote.classList.remove('hidden');
  if (sourcePreviewUrl && convertedAudioPreview.src !== sourcePreviewUrl) {
    convertedAudioPreview.src = sourcePreviewUrl;
  }
  outputPreviewDimensionsRow.classList.add('hidden');
  outputDurationRow.classList.remove('hidden');
  outputPreviewDuration.textContent = formatDuration(audioDuration);
  outputPreviewName.textContent = `${baseName(file)}.${outputFormat.value}`;
  outputPreviewType.textContent = outputFormat.options[outputFormat.selectedIndex]?.textContent || outputFormat.value;
  const bitrate = profile.bitrate
    ? Number(document.getElementById('mediaBitrate').value)
    : profile.estimatedBitrate;
  outputPreviewQuality.textContent = profile.bitrate
    ? `${bitrate} kbps audio`
    : `${bitrate} kbps estimated · ${profile.codec}`;
  outputQualityLabel.textContent = 'Output audio quality';
  if (audioDuration > 0 && bitrate > 0) {
    const estimatedBytes = bitrate * 1000 * audioDuration / 8;
    outputPreviewSize.textContent = `About ${formatBytes(estimatedBytes)}`;
    outputPreviewSize.title = 'Approximate output size based on audio duration and selected or estimated codec bitrate. Actual size may vary.';
  } else {
    outputPreviewSize.textContent = 'Unavailable until duration is readable';
    outputPreviewSize.title = 'A readable audio duration is required to estimate output size.';
  }
  resizePreview.classList.remove('hidden');
}

function updateVideoOutputControls() {
  const audioOnly = VIDEO_AUDIO_FORMATS.has(outputFormat.value);
  videoSizingControls.classList.toggle('hidden', audioOnly);
  videoAudioBitrateControl.classList.toggle('hidden', audioOnly);
  configureMediaBitrate(!audioOnly);
}

function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return 'Not available';
  const totalSeconds = Math.floor(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainder = totalSeconds % 60;
  return hours
    ? `${hours}:${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`
    : `${minutes}:${String(remainder).padStart(2, '0')}`;
}

function download(blob, filename) {
  clearOutput();
  if (activeType === 'video') {
    outputPreviewSize.textContent = formatBytes(blob.size);
    outputPreviewSize.title = 'Actual encoded output file size.';
  }
  outputUrl = URL.createObjectURL(blob);
  downloadLink.href = outputUrl;
  downloadLink.download = filename;
  const inputBytes = files.reduce((total, file) => total + file.size, 0);
  const change = inputBytes ? ((blob.size - inputBytes) / inputBytes) * 100 : 0;
  const changeText = change <= 0
    ? `${Math.abs(change).toFixed(1)}% smaller`
    : `${change.toFixed(1)}% larger`;
  outputDetails.textContent = `${filename} · ${formatBytes(blob.size)} · ${changeText} than input`;
  outputPanel.classList.remove('hidden');
}

function baseName(file) {
  return file.name.replace(/\.[^.]+$/, '') || 'converted-file';
}

async function loadImage(file) {
  try {
    return await createImageBitmap(file);
  } catch (bitmapError) {
    try {
      return await loadBrowserImage(file);
    } catch (imageError) {
      const fileExtension = extension(file.name);
      if (['tif', 'tiff'].includes(fileExtension)) return loadTiffImage(file);
      if (['heic', 'heif'].includes(fileExtension)) return loadHeicImage(file);
      if (fileExtension === 'pdf' || file.type === 'application/pdf') return loadPdfImage(file);
      throw new Error(
        `${fileExtension.toUpperCase() || 'This'} file could not be decoded by this browser. Try a browser-supported image or convert it to JPEG, PNG, or WebP first.`,
        { cause: imageError || bitmapError },
      );
    }
  }
}

async function loadBrowserImage(file) {
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  try {
    await image.decode();
    image.close = () => URL.revokeObjectURL(url);
    return image;
  } catch (error) {
    URL.revokeObjectURL(url);
    throw error;
  }
}

async function loadTiffImage(file) {
  setStatus('Loading TIFF decoder...');
  await loadScript('https://cdn.jsdelivr.net/npm/utif@3.1.0/UTIF.min.js');
  if (!globalThis.UTIF) throw new Error('The TIFF decoder is unavailable.');
  const buffer = await file.arrayBuffer();
  const pages = globalThis.UTIF.decode(buffer);
  if (!pages.length) throw new Error('This TIFF file does not contain a readable image.');
  const page = pages[0];
  globalThis.UTIF.decodeImage(buffer, page);
  const canvas = document.createElement('canvas');
  canvas.width = page.width;
  canvas.height = page.height;
  const context = canvas.getContext('2d');
  const pixels = new Uint8ClampedArray(globalThis.UTIF.toRGBA8(page));
  context.putImageData(new ImageData(pixels, page.width, page.height), 0, 0);
  canvas.close = () => {};
  return canvas;
}

async function loadHeicImage(file) {
  setStatus('Loading HEIC/HEIF decoder...');
  await loadScript('https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js');
  if (typeof globalThis.heic2any !== 'function') throw new Error('The HEIC/HEIF decoder is unavailable.');
  const converted = await globalThis.heic2any({ blob: file, toType: 'image/png' });
  const blob = Array.isArray(converted) ? converted[0] : converted;
  if (!(blob instanceof Blob)) throw new Error('The HEIC/HEIF decoder did not return an image.');
  return loadBrowserImage(blob);
}

async function loadPdfImage(file) {
  const pdfjs = await loadPdfJs();
  const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  const page = await pdf.getPage(1);
  const initialViewport = page.getViewport({ scale: 1 });
  const scale = Math.min(2, 2400 / initialViewport.width);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);
  await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
  canvas.close = () => {};
  return canvas;
}

function canvasBlob(canvas, mime, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('This browser could not encode the selected image format.')), mime, quality);
  });
}

function createCanvas(bitmap, maxWidth, mime, quality) {
  const scale = Math.min(1, maxWidth / bitmap.width);
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext('2d', { alpha: mime !== 'image/jpeg' });
  if (mime === 'image/jpeg') {
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas;
}

function imageTargetDimensions() {
  const selected = imageDimensions.value.split('x').map(Number);
  if (selected.length !== 2 || selected.some(value => !Number.isFinite(value) || value < 1)) {
    throw new Error('Choose valid output dimensions for the image.');
  }
  return { width: selected[0], height: selected[1] };
}

function populateImageDimensions() {
  if (!imageSourceDimensions) return;
  const { width, height } = imageSourceDimensions;
  const maxEdge = Math.max(width, height);
  const ratio = imageAspectRatio.value === 'original'
    ? width / height
    : (() => {
      const [ratioWidth, ratioHeight] = imageAspectRatio.value.split(':').map(Number);
      return ratioWidth / ratioHeight;
    })();
  const sourceRatio = width / height;
  const cropWidth = sourceRatio > ratio ? height * ratio : width;
  const cropHeight = sourceRatio > ratio ? height : width / ratio;
  const availableEdge = Math.floor(Math.max(cropWidth, cropHeight));
  const edgeOptions = [...new Set([320, 480, 640, 800, 1024, 1280, 1600, 1920, 2560, 3840, maxEdge]
    .filter(edge => edge <= availableEdge))].sort((a, b) => a - b);
  const previousDimensions = imageDimensions.value.split('x').map(Number);
  const previousEdge = Math.max(...previousDimensions);
  const dimensionOptions = edgeOptions.map(edge => {
    let outputWidth;
    let outputHeight;
    if (ratio >= 1) {
      outputWidth = edge;
      outputHeight = Math.max(1, Math.round(edge / ratio));
    } else {
      outputHeight = edge;
      outputWidth = Math.max(1, Math.round(edge * ratio));
    }
    return { width: outputWidth, height: outputHeight, edge };
  });

  if (imageAspectRatio.value === 'original') {
    dimensionOptions.push({ width, height, edge: maxEdge, original: true });
  }
  const uniqueOptions = [...new Map(dimensionOptions.map(option => [`${option.width}x${option.height}`, option])).values()];
  imageDimensions.replaceChildren(...uniqueOptions.map(option => {
    const value = `${option.width}x${option.height}`;
    const choice = document.createElement('option');
    choice.value = value;
    choice.textContent = `${option.width} × ${option.height} px${option.original ? ' (original)' : ''}`;
    return choice;
  }));
  imageDimensions.disabled = false;
  const preferred = (imageAspectRatio.value === 'original' && uniqueOptions.find(option => option.original))
    || uniqueOptions.find(option => option.edge === previousEdge && !option.original)
    || uniqueOptions.find(option => option.original)
    || uniqueOptions[uniqueOptions.length - 1];
  imageDimensions.value = `${preferred.width}x${preferred.height}`;
}

function videoTargetDimensions() {
  const [width, height] = videoDimensions.value.split('x').map(Number);
  if (![width, height].every(value => Number.isFinite(value) && value > 0)) {
    throw new Error('Choose valid output dimensions for the video.');
  }
  return { width, height };
}

function videoBitrateForDimensions(bitrate, dimensions) {
  if (!videoSourceDimensions || !dimensions) return bitrate;
  const sourcePixels = videoSourceDimensions.width * videoSourceDimensions.height;
  const outputPixels = dimensions.width * dimensions.height;
  const resolutionScale = Math.max(0.25, Math.min(1, outputPixels / sourcePixels));
  return Math.max(100, Math.round(bitrate * resolutionScale));
}

function populateVideoDimensions() {
  if (!videoSourceDimensions) return;
  const { width, height } = videoSourceDimensions;
  const sourceRatio = width / height;
  let ratio = sourceRatio;
  if (videoAspectRatio.value !== 'original') {
    const [ratioWidth, ratioHeight] = videoAspectRatio.value.split(':').map(Number);
    ratio = ratioWidth / ratioHeight;
  }
  const cropWidth = sourceRatio > ratio ? height * ratio : width;
  const cropHeight = sourceRatio > ratio ? height : width / ratio;
  const availableEdge = Math.max(1, Math.floor(Math.max(cropWidth, cropHeight)));
  const sizes = [...new Set([320, 480, 640, 800, 1024, 1280, 1600, 1920, 2560, 3840, availableEdge]
    .filter(size => size <= availableEdge))].sort((a, b) => a - b);
  const dimensionOptions = sizes.map(edge => ratio >= 1
    ? { width: edge, height: Math.max(1, Math.round(edge / ratio)), edge }
    : { width: Math.max(1, Math.round(edge * ratio)), height: edge, edge });
  if (videoAspectRatio.value === 'original') dimensionOptions.push({ width, height, edge: Math.max(width, height), original: true });
  const uniqueOptions = [...new Map(dimensionOptions.map(option => [`${option.width}x${option.height}`, option])).values()];
  videoDimensions.replaceChildren(...uniqueOptions.map(option => {
    const value = `${option.width}x${option.height}`;
    const label = `${option.width} × ${option.height} px${option.original ? ' (original)' : ''}`;
    return new Option(label, value);
  }));
  videoDimensions.disabled = false;
  const preferred = (videoAspectRatio.value === 'original' && uniqueOptions.find(option => option.original))
    || uniqueOptions[uniqueOptions.length - 1];
  videoDimensions.value = `${preferred.width}x${preferred.height}`;
}

function renderVideoOutputPreview() {
  if (!files.length || !isVideoFile(files[0])) return;
  const file = files[0];
  const audioProfile = VIDEO_AUDIO_OUTPUT_PROFILES[outputFormat.value];
  const profile = VIDEO_OUTPUT_PROFILES[outputFormat.value];
  const audioOnly = Boolean(audioProfile);
  const dimensions = !audioOnly && videoSourceDimensions && videoDimensions.value
    ? videoTargetDimensions()
    : null;
  outputAudioOnlyNotice.classList.toggle('hidden', !audioOnly);
  convertedVideoFrame.classList.toggle('hidden', audioOnly);
  outputPreviewDimensionsRow.classList.toggle('hidden', audioOnly);
  convertedPreview.classList.add('hidden');
  outputAspectRatioRow.classList.toggle('hidden', !dimensions);
  convertedVideoPreview.classList.toggle('hidden', audioOnly);
  convertedVideoFrame.classList.toggle('hidden', audioOnly);
  resizePreview.classList.remove('hidden');
  if (!audioOnly && convertedVideoPreview.src !== sourcePreviewUrl) convertedVideoPreview.src = sourcePreviewUrl;
  if (dimensions) {
    const ratio = dimensions.width / dimensions.height;
    convertedVideoFrame.style.aspectRatio = `${dimensions.width} / ${dimensions.height}`;
    convertedVideoFrame.style.width = `${Math.min(576, Math.max(144, Math.round(256 * ratio)))}px`;
  } else {
    convertedVideoFrame.style.removeProperty('aspect-ratio');
    convertedVideoFrame.style.width = '100%';
  }
  convertedVideoPreview.style.width = '100%';
  convertedVideoPreview.style.height = '100%';
  convertedVideoPreview.style.objectFit = dimensions ? 'cover' : 'contain';
  convertedVideoPreview.controls = true;
  convertedVideoPreview.loop = true;
  convertedVideoPreview.muted = true;
  outputPreviewName.textContent = `${baseName(file)}.${outputFormat.value}`;
  outputPreviewType.textContent = outputFormat.options[outputFormat.selectedIndex]?.textContent || outputFormat.value;
  const selectedBitrate = Number(document.getElementById('mediaBitrate').value);
  const videoBitrate = videoBitrateForDimensions(selectedBitrate, dimensions);
  const estimateBitrate = audioOnly
    ? (audioProfile.bitrate ? selectedBitrate : audioProfile.estimatedBitrate)
    : videoBitrate;
  outputPreviewQuality.textContent = audioOnly
    ? audioProfile.bitrate ? `${selectedBitrate} kbps audio` : `${estimateBitrate} kbps estimated · ${audioProfile.codec}`
    : `${videoBitrate} kbps video`;
  outputPreviewAspectRatio.textContent = dimensions
    ? aspectRatioLabel(dimensions.width, dimensions.height)
    : '';
  outputPreviewDimensions.textContent = dimensions
    ? `${dimensions.width} × ${dimensions.height} px`
    : 'Not available';
  outputPreviewDuration.textContent = formatDuration(videoDuration);
  outputDurationRow.classList.remove('hidden');
  const bitrate = videoBitrate;
  const audioBitrate = audioOnly
    ? 0
    : profile && profile.audio
    ? Number(document.getElementById('videoAudioBitrate').value)
    : 0;
  if (videoDuration > 0) {
    const estimatedBytes = ((audioOnly ? estimateBitrate : bitrate + audioBitrate) * 1000 * videoDuration) / 8;
    outputPreviewSize.textContent = `About ${formatBytes(estimatedBytes)}`;
    outputPreviewSize.title = audioOnly
      ? 'Approximate audio-only output size based on the selected audio bitrate or an estimated codec bitrate and source duration.'
      : 'Approximate estimate based on the resolution-adjusted video bitrate, output audio bitrate when supported, and source duration; actual size can vary.';
  } else {
    outputPreviewSize.textContent = 'Unavailable';
    outputPreviewSize.title = 'A readable source duration is required to estimate the output file size.';
  }
}

function aspectRatioLabel(width, height) {
  const divisor = (a, b) => b === 0 ? a : divisor(b, a % b);
  const common = divisor(width, height);
  return `${width / common}:${height / common}`;
}

function createImageCanvas(bitmap, width, height, format) {
  const targetRatio = width / height;
  const sourceRatio = bitmap.width / bitmap.height;
  let sourceX = 0;
  let sourceY = 0;
  let sourceWidth = bitmap.width;
  let sourceHeight = bitmap.height;
  if (sourceRatio > targetRatio) {
    sourceWidth = bitmap.height * targetRatio;
    sourceX = (bitmap.width - sourceWidth) / 2;
  } else if (sourceRatio < targetRatio) {
    sourceHeight = bitmap.width / targetRatio;
    sourceY = (bitmap.height - sourceHeight) / 2;
  }
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const opaque = ['jpg', 'jpeg', 'jpe', 'jfif'].includes(format);
  const context = canvas.getContext('2d', { alpha: !opaque });
  if (opaque) {
    context.fillStyle = '#fff';
    context.fillRect(0, 0, width, height);
  }
  context.drawImage(bitmap, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, width, height);
  return canvas;
}

async function encodeImageCanvas(canvas, format) {
  const quality = Number(qualityRange.value) / 100;
  if (['jpg', 'jpeg', 'jpe', 'jfif', 'png', 'webp', 'avif', 'jxl'].includes(format)) {
    const blob = await canvasBlob(canvas, IMAGE_FORMAT_MIME[format], quality);
    if (blob.type !== IMAGE_FORMAT_MIME[format]) {
      throw new Error(`${format.toUpperCase()} encoding is unavailable in this browser.`);
    }
    return { blob, width: canvas.width, height: canvas.height };
  }
  if (format === 'bmp') {
    return { blob: encodeBmp(canvas), width: canvas.width, height: canvas.height };
  }
  if (format === 'gif') {
    return { blob: await encodeGif(canvas), width: canvas.width, height: canvas.height };
  }
  if (format === 'tif' || format === 'tiff') {
    return { blob: await encodeTiff(canvas), width: canvas.width, height: canvas.height };
  }
  if (format === 'ico' || format === 'cur') {
    const iconCanvas = document.createElement('canvas');
    const scale = Math.min(1, 256 / Math.max(canvas.width, canvas.height));
    iconCanvas.width = Math.max(1, Math.round(canvas.width * scale));
    iconCanvas.height = Math.max(1, Math.round(canvas.height * scale));
    iconCanvas.getContext('2d').drawImage(canvas, 0, 0, iconCanvas.width, iconCanvas.height);
    return {
      blob: await encodeIcon(iconCanvas, format === 'cur'),
      width: iconCanvas.width,
      height: iconCanvas.height,
    };
  }
  if (format === 'eps') {
    return { blob: encodeEps(canvas), width: canvas.width, height: canvas.height };
  }
  if (format === 'pdf') {
    return { blob: await encodePdf(canvas), width: canvas.width, height: canvas.height };
  }
  if (format === 'svg') {
    return { blob: await encodeSvg(canvas), width: canvas.width, height: canvas.height };
  }
  throw new Error(`${format.toUpperCase()} export is unavailable in this browser.`);
}

function encodeBmp(canvas) {
  const { width, height } = canvas;
  const pixels = canvas.getContext('2d').getImageData(0, 0, width, height).data;
  const rowSize = Math.ceil((width * 3) / 4) * 4;
  const pixelBytes = rowSize * height;
  const buffer = new ArrayBuffer(54 + pixelBytes);
  const view = new DataView(buffer);
  view.setUint8(0, 0x42);
  view.setUint8(1, 0x4d);
  view.setUint32(2, buffer.byteLength, true);
  view.setUint32(10, 54, true);
  view.setUint32(14, 40, true);
  view.setInt32(18, width, true);
  view.setInt32(22, height, true);
  view.setUint16(26, 1, true);
  view.setUint16(28, 24, true);
  view.setUint32(34, pixelBytes, true);
  for (let y = 0; y < height; y += 1) {
    const rowOffset = 54 + (height - y - 1) * rowSize;
    for (let x = 0; x < width; x += 1) {
      const sourceOffset = (y * width + x) * 4;
      const targetOffset = rowOffset + x * 3;
      const alpha = pixels[sourceOffset + 3] / 255;
      view.setUint8(targetOffset, Math.round(pixels[sourceOffset + 2] * alpha + 255 * (1 - alpha)));
      view.setUint8(targetOffset + 1, Math.round(pixels[sourceOffset + 1] * alpha + 255 * (1 - alpha)));
      view.setUint8(targetOffset + 2, Math.round(pixels[sourceOffset] * alpha + 255 * (1 - alpha)));
    }
  }
  return new Blob([buffer], { type: 'image/bmp' });
}

async function encodeGif(canvas) {
  setStatus('Loading GIF encoder...');
  await loadScript('https://cdn.jsdelivr.net/npm/omggif@1.0.10/omggif.js');
  if (typeof globalThis.GifWriter !== 'function') throw new Error('The GIF encoder is unavailable.');
  const { width, height } = canvas;
  const pixels = canvas.getContext('2d').getImageData(0, 0, width, height).data;
  const palette = new Array(256);
  for (let index = 0; index < palette.length; index += 1) {
    const red = (index >> 5) & 7;
    const green = (index >> 2) & 7;
    const blue = index & 3;
    palette[index] = ((red * 255 / 7) << 16) | ((green * 255 / 7) << 8) | (blue * 255 / 3);
  }
  const indexed = new Uint8Array(width * height);
  for (let pixel = 0; pixel < indexed.length; pixel += 1) {
    const offset = pixel * 4;
    const alpha = pixels[offset + 3] / 255;
    const red = Math.round(pixels[offset] * alpha + 255 * (1 - alpha));
    const green = Math.round(pixels[offset + 1] * alpha + 255 * (1 - alpha));
    const blue = Math.round(pixels[offset + 2] * alpha + 255 * (1 - alpha));
    indexed[pixel] = ((red >> 5) << 5) | ((green >> 5) << 2) | (blue >> 6);
  }
  const buffer = new Uint8Array(width * height * 5 + 1024);
  const writer = new globalThis.GifWriter(buffer, width, height, { palette });
  writer.addFrame(0, 0, width, height, indexed, { palette, delay: 0 });
  const length = writer.end();
  return new Blob([buffer.subarray(0, length)], { type: 'image/gif' });
}

async function encodeTiff(canvas) {
  setStatus('Loading TIFF encoder...');
  await loadScript('https://cdn.jsdelivr.net/npm/utif@3.1.0/UTIF.min.js');
  if (!globalThis.UTIF || typeof globalThis.UTIF.encodeImage !== 'function') {
    throw new Error('The TIFF encoder is unavailable.');
  }
  const { width, height } = canvas;
  const rgba = canvas.getContext('2d').getImageData(0, 0, width, height).data;
  const buffer = globalThis.UTIF.encodeImage(rgba.buffer, width, height);
  return new Blob([buffer], { type: 'image/tiff' });
}

async function encodeIcon(canvas, cursor) {
  const png = await canvasBlob(canvas, 'image/png');
  const pngBytes = new Uint8Array(await png.arrayBuffer());
  const buffer = new ArrayBuffer(22 + pngBytes.length);
  const view = new DataView(buffer);
  view.setUint16(2, cursor ? 2 : 1, true);
  view.setUint16(4, 1, true);
  view.setUint8(6, canvas.width === 256 ? 0 : canvas.width);
  view.setUint8(7, canvas.height === 256 ? 0 : canvas.height);
  view.setUint8(8, 0);
  view.setUint8(9, 0);
  view.setUint16(10, cursor ? 0 : 1, true);
  view.setUint16(12, cursor ? 0 : 32, true);
  view.setUint32(14, pngBytes.length, true);
  view.setUint32(18, 22, true);
  new Uint8Array(buffer, 22).set(pngBytes);
  return new Blob([buffer], { type: cursor ? 'image/x-icon' : 'image/vnd.microsoft.icon' });
}

function encodeEps(canvas) {
  const { width, height } = canvas;
  const pixels = canvas.getContext('2d').getImageData(0, 0, width, height).data;
  const lines = [];
  let line = '';
  for (let pixel = 0; pixel < width * height; pixel += 1) {
    const offset = pixel * 4;
    const alpha = pixels[offset + 3] / 255;
    for (let channel = 0; channel < 3; channel += 1) {
      const value = Math.round(pixels[offset + channel] * alpha + 255 * (1 - alpha));
      line += value.toString(16).padStart(2, '0');
    }
    if (line.length >= 72) {
      lines.push(line);
      line = '';
    }
  }
  if (line) lines.push(line);
  const header = [
    '%!PS-Adobe-3.0 EPSF-3.0',
    `%%BoundingBox: 0 0 ${width} ${height}`,
    `%%ImageData: ${width} ${height} 8 3 0 1 1`,
    'gsave',
    `${width} ${height} scale`,
    `${width} ${height} 8 [${width} 0 0 -${height} 0 ${height}]`,
    `{ currentfile ${width * 3} string readhexstring pop } false 3 colorimage`,
  ].join('\n');
  return new Blob([header, '\n', lines.join('\n'), '\ngrestore\n%%EOF\n'], { type: 'application/postscript' });
}

async function encodePdf(canvas) {
  const pdfLib = await loadPdfLib();
  const document = await pdfLib.PDFDocument.create();
  const imageBlob = await canvasBlob(canvas, 'image/png');
  const image = await document.embedPng(await imageBlob.arrayBuffer());
  const page = document.addPage([canvas.width, canvas.height]);
  page.drawImage(image, { x: 0, y: 0, width: canvas.width, height: canvas.height });
  return new Blob([await document.save()], { type: 'application/pdf' });
}

function bytesToBase64(bytes) {
  let binary = '';
  const chunkSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }
  return btoa(binary);
}

async function encodeSvg(canvas) {
  const png = await canvasBlob(canvas, 'image/png');
  const bytes = new Uint8Array(await png.arrayBuffer());
  const data = bytesToBase64(bytes);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}"><image width="${canvas.width}" height="${canvas.height}" href="data:image/png;base64,${data}"/></svg>`;
  return new Blob([svg], { type: 'image/svg+xml' });
}

function imageOutputName(file) {
  return `${baseName(file)}.${outputFormat.value}`;
}

function formatFileType(file, fileExtension = extension(file.name)) {
  const mimeLabels = {
    'image/jpeg': 'JPEG',
    'image/png': 'PNG',
    'image/webp': 'WebP',
    'image/gif': 'GIF',
    'image/bmp': 'BMP',
    'image/svg+xml': 'SVG',
    'image/avif': 'AVIF',
  };
  return mimeLabels[file.type] || fileExtension.toUpperCase() || 'FILE';
}

function scheduleImagePreview(delay = 200) {
  clearTimeout(previewTimer);
  previewRevision += 1;
  const revision = previewRevision;
  previewBlob = null;
  if (!isImageConversionContext() || !files.length) return;
  clearOutput();
  setStatus('Updating output preview...');
  previewTimer = setTimeout(() => updateImagePreview(revision), delay);
}

function refreshImagePreview() {
  clearTimeout(previewTimer);
  previewRevision += 1;
  const revision = previewRevision;
  previewBlob = null;
  if (!isImageConversionContext() || !files.length) return;
  clearOutput();
  setStatus('Updating output preview...');
  updateImagePreview(revision);
}

async function updateImagePreview(revision) {
  const file = files[0];
  const selectedFormat = outputFormat.value;
  if (selectedFormat === 'image-zip' || selectedFormat.startsWith('pdf-')) {
    renderImageActionPreview();
    return;
  }
  if (isPdfFile(file) && selectedFormat === 'pdf') {
    previewBlob = file;
    if (outputPreviewUrl) URL.revokeObjectURL(outputPreviewUrl);
    outputPreviewUrl = null;
    convertedPreview.src = sourcePreview.src;
    outputPreviewName.textContent = file.name;
    outputPreviewType.textContent = outputFormat.options[outputFormat.selectedIndex].textContent;
    outputPreviewQuality.textContent = 'Original (unchanged)';
    outputPreviewAspectRatio.textContent = aspectRatioLabel(imageSourceDimensions.width, imageSourceDimensions.height);
    outputAspectRatioRow.classList.remove('hidden');
    outputPreviewDimensions.textContent = `${imageSourceDimensions.width} × ${imageSourceDimensions.height} px`;
    outputPreviewSize.textContent = formatBytes(file.size);
    resizePreview.classList.remove('hidden');
    setStatus('Original PDF ready to download.', false, true);
    return;
  }
  if (files.length > 1) {
    renderImageActionPreview();
    return;
  }
  let bitmap;
  try {
    bitmap = await loadImage(file);
    if (revision !== previewRevision) {
      bitmap.close();
      return;
    }
    if (!imageSettingsTouched && outputFormat.value === extension(file.name) && extension(file.name) !== 'pdf') {
      bitmap.close();
      bitmap = null;
      previewBlob = file;
      if (outputPreviewUrl) URL.revokeObjectURL(outputPreviewUrl);
      outputPreviewUrl = URL.createObjectURL(file);
      convertedPreview.src = outputPreviewUrl;
      outputPreviewName.textContent = imageOutputName(file);
      outputPreviewType.textContent = outputFormat.options[outputFormat.selectedIndex].textContent;
      outputPreviewQuality.textContent = 'Original (unchanged)';
      outputPreviewAspectRatio.textContent = aspectRatioLabel(imageSourceDimensions.width, imageSourceDimensions.height);
      outputAspectRatioRow.classList.remove('hidden');
      outputPreviewDimensions.textContent = `${imageSourceDimensions.width} × ${imageSourceDimensions.height} px`;
      outputPreviewSize.textContent = formatBytes(file.size);
      resizePreview.classList.remove('hidden');
      setStatus('Original image ready to download.', false, true);
      return;
    }
    const { width, height } = imageTargetDimensions();
    const canvas = createImageCanvas(bitmap, width, height, selectedFormat === 'pdf' ? 'jpg' : selectedFormat);
    bitmap.close();
    bitmap = null;
    const encoded = selectedFormat === 'pdf'
      ? { blob: await imagesToPdf([file]), width: canvas.width, height: canvas.height }
      : await encodeImageCanvas(canvas, selectedFormat);
    if (revision !== previewRevision) return;
    const outputBlob = encoded.blob;

    const displayBlob = selectedFormat === 'pdf'
      ? await canvasBlob(canvas, 'image/jpeg', Number(qualityRange.value) / 100)
      : ['eps', 'tif', 'tiff', 'ico', 'cur'].includes(selectedFormat)
        ? await canvasBlob(canvas, 'image/png')
        : outputBlob;
    if (revision !== previewRevision) return;
    previewBlob = outputBlob;
    if (outputPreviewUrl) URL.revokeObjectURL(outputPreviewUrl);
    outputPreviewUrl = URL.createObjectURL(displayBlob);
    convertedPreview.src = outputPreviewUrl;
    outputPreviewName.textContent = imageOutputName(file);
    outputPreviewType.textContent = outputFormat.options[outputFormat.selectedIndex].textContent;
    outputPreviewQuality.textContent = ['jpg', 'jpeg', 'jpe', 'jfif', 'webp', 'avif', 'jxl'].includes(selectedFormat)
      ? `${qualityRange.value}%`
      : selectedFormat === 'gif' ? '256-color palette' : 'Lossless';
    outputPreviewAspectRatio.textContent = aspectRatioLabel(encoded.width, encoded.height);
    outputAspectRatioRow.classList.remove('hidden');
    outputPreviewDimensions.textContent = `${encoded.width} × ${encoded.height} px`;
    outputPreviewSize.textContent = formatBytes(outputBlob.size);
    resizePreview.classList.remove('hidden');
    setStatus('Output preview updated.', false, true);
  } catch (error) {
    if (bitmap) bitmap.close();
    if (revision === previewRevision) setStatus(error.message || 'Could not create an output preview.', true);
  }
}

function renderImageActionPreview() {
  const pdfInput = hasPdfInput();
  const format = outputFormat.value;
  const isZipOutput = format === 'image-zip' || format === 'pdf-jpgzip' || format === 'pdf-pngzip';
  const file = files[0];
  if (!file) return;
  convertedPreview.classList.add('hidden');
  convertedVideoFrame.classList.add('hidden');
  convertedVideoPreview.classList.add('hidden');
  outputDocumentPreview.classList.remove('hidden');
  outputDocumentPreview.textContent = format === 'pdf'
    ? `Create a PDF from ${files.length} selected image${files.length === 1 ? '' : 's'}.`
    : format === 'image-zip'
      ? `Bundle ${files.length} selected image${files.length === 1 ? '' : 's'} into a ZIP archive.`
      : pdfInput
        ? `Export PDF pages as ${format === 'pdf-jpgzip' ? 'JPEG' : 'PNG'} images in a ZIP archive.`
        : files.length > 1
          ? 'Choose PDF or ZIP to combine multiple images in one output.'
          : 'Prepare the selected PDF workflow.';
  outputPreviewName.textContent = `${baseName(file)}${isZipOutput ? (format === 'image-zip' ? '-images.zip' : '-pages.zip') : `${files.length > 1 ? '-images' : ''}.pdf`}`;
  outputPreviewType.textContent = outputFormat.options[outputFormat.selectedIndex]?.textContent || format;
  outputPreviewQuality.textContent = isZipOutput
    ? `${pdfInput && format === 'pdf-jpgzip' ? `${qualityRange.value}% JPEG · ` : ''}ZIP level ${document.getElementById('compressionLevel').value}/9`
    : format === 'pdf' && files.length > 1
      ? `${qualityRange.value}% JPEG · max width ${document.getElementById('resizeWidth').value}px`
      : 'Not applicable';
  outputPreviewAspectRatio.textContent = '';
  outputAspectRatioRow.classList.add('hidden');
  outputPreviewDimensions.textContent = files.length > 1
    ? `${files.length} images selected`
    : pdfInput ? `PDF pages · max width ${document.getElementById('resizeWidth').value}px` : `${file.name}`;
  if (format === 'image-zip') {
    const inputBytes = files.reduce((sum, image) => sum + image.size, 0);
    outputPreviewSize.textContent = `Up to ${formatBytes(inputBytes)}`;
    outputPreviewSize.title = 'ZIP compression can reduce the combined source image size.';
  } else {
    outputPreviewSize.textContent = 'Calculated during conversion';
    outputPreviewSize.title = 'The output size depends on the encoded pages and compression settings.';
  }
  resizePreview.classList.remove('hidden');
  setStatus('Output preview updated.', false, true);
}

async function convertImage() {
  if (!files.length) throw new Error('Choose an image to convert.');
  if (hasPdfInput() && (
    outputFormat.value === 'pdf-compressed' || isPdfPageExport(outputFormat.value)
  )) {
    await convertPdf(files[0], outputFormat.value);
    return;
  }
  if (outputFormat.value === 'image-zip') {
    const JSZip = await loadZip();
    const archive = new JSZip();
    files.forEach(file => archive.file(file.name, file));
    const blob = await archive.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: Number(document.getElementById('compressionLevel').value) },
    });
    download(blob, files.length === 1 ? `${baseName(files[0])}-images.zip` : 'converted-images.zip');
    return;
  }
  if (outputFormat.value === 'pdf' && files.length > 1) {
    const blob = await imagesToPdf(files);
    download(blob, `${baseName(files[0])}${files.length > 1 ? '-images' : ''}.pdf`);
    return;
  }
  if (files.length !== 1) throw new Error('Choose PDF or ZIP to convert multiple images together.');
  const file = files[0];
  if (!previewBlob) {
    clearTimeout(previewTimer);
    await updateImagePreview(previewRevision);
  }
  if (!previewBlob) throw new Error('The output preview is not ready. Please try again.');
  download(previewBlob, imageOutputName(file));
}

async function loadPdfJs() {
  setStatus('Loading PDF reader...');
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js');
  if (!globalThis.pdfjsLib) throw new Error('The PDF rendering library is unavailable.');
  globalThis.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  return globalThis.pdfjsLib;
}

async function loadPdfLib() {
  setStatus('Loading PDF writer...');
  await loadScript('https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js');
  if (!globalThis.PDFLib) throw new Error('The PDF creation library is unavailable.');
  return globalThis.PDFLib;
}

async function renderPdfPages(file, imageFormat, makePdf) {
  const pdfjs = await loadPdfJs();
  const pdfLib = makePdf ? await loadPdfLib() : null;
  const JSZip = makePdf ? null : await loadZip();
  const source = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  if (source.numPages > 100) throw new Error('PDFs are limited to 100 pages per conversion.');
  const zip = !makePdf ? new JSZip() : null;
  const pdfOutput = makePdf ? await pdfLib.PDFDocument.create() : null;
  const maxWidth = Math.max(160, Number(document.getElementById('resizeWidth').value) || 1920);
  const quality = Number(qualityRange.value) / 100;

  for (let pageNumber = 1; pageNumber <= source.numPages; pageNumber += 1) {
    setStatus(`Rendering PDF page ${pageNumber} of ${source.numPages}...`);
    const page = await source.getPage(pageNumber);
    const originalViewport = page.getViewport({ scale: 1 });
    const scale = Math.min(1.5, maxWidth / originalViewport.width);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
    const mime = imageFormat === 'png' ? 'image/png' : 'image/jpeg';
    const blob = await canvasBlob(canvas, mime, quality);

    if (makePdf) {
      const imageBytes = await blob.arrayBuffer();
      const embedded = imageFormat === 'png'
        ? await pdfOutput.embedPng(imageBytes)
        : await pdfOutput.embedJpg(imageBytes);
      const outputPage = pdfOutput.addPage([originalViewport.width, originalViewport.height]);
      outputPage.drawImage(embedded, { x: 0, y: 0, width: originalViewport.width, height: originalViewport.height });
    } else {
      const suffix = imageFormat === 'png' ? 'png' : 'jpg';
      zip.file(`page-${String(pageNumber).padStart(3, '0')}.${suffix}`, blob);
    }
    canvas.width = 1;
    canvas.height = 1;
  }

  if (makePdf) {
    const bytes = await pdfOutput.save({ useObjectStreams: true });
    return new Blob([bytes], { type: 'application/pdf' });
  }
  return zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: Number(document.getElementById('compressionLevel').value) } });
}

async function imagesToPdf(imageFiles) {
  const { PDFDocument } = await loadPdfLib();
  const pdf = await PDFDocument.create();
  const maxWidth = Math.max(160, Number(document.getElementById('resizeWidth').value) || 1920);
  for (const file of imageFiles) {
    setStatus(`Adding ${file.name} to PDF...`);
    const bitmap = await loadImage(file);
    const sourceMime = 'image/jpeg';
    const dimensions = imageFiles.length === 1
      ? imageTargetDimensions()
      : {
        width: Math.max(1, Math.round(bitmap.width * Math.min(1, maxWidth / bitmap.width))),
        height: Math.max(1, Math.round(bitmap.height * Math.min(1, maxWidth / bitmap.width))),
      };
    const canvas = imageFiles.length === 1
      ? createImageCanvas(bitmap, dimensions.width, dimensions.height, 'jpg')
      : createCanvas(bitmap, maxWidth, sourceMime);
    bitmap.close();
    const blob = await canvasBlob(canvas, sourceMime, Number(qualityRange.value) / 100);
    const bytes = await blob.arrayBuffer();
    const embedded = sourceMime === 'image/png' ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);
    const page = pdf.addPage([embedded.width, embedded.height]);
    page.drawImage(embedded, { x: 0, y: 0, width: embedded.width, height: embedded.height });
  }
  const bytes = await pdf.save({ useObjectStreams: true });
  return new Blob([bytes], { type: 'application/pdf' });
}

async function convertPdf(file, format) {
  if (!file || !isPdfFile(file)) throw new Error('Choose a PDF document for this export.');
  if (file.size > 100 * 1024 * 1024) throw new Error('PDF files must be 100 MB or smaller.');
  if (format === 'pdf-compressed') {
    const blob = await renderPdfPages(file, 'jpg', true);
    download(blob, `${baseName(file)}-compressed.pdf`);
    return;
  }
  if (format === 'pdf-jpgzip' || format === 'pdf-pngzip') {
    const imageFormat = format === 'pdf-pngzip' ? 'png' : 'jpg';
    const blob = await renderPdfPages(file, imageFormat, false);
    download(blob, `${baseName(file)}-pages.zip`);
    return;
  }
  throw new Error('Choose a PDF export option.');
}

function escapeXml(text) {
  return text.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]);
}

async function textToDocx(text) {
  const JSZip = await loadZip();
  const font = documentFont.value;
  const fontSize = Number(documentFontSize.value);
  const detectHeadings = documentHeadings.value === 'markdown';
  const paragraphs = text.split(/\r?\n/).map(line => {
    const heading = detectHeadings ? /^(#{1,6})\s+(.+)$/.exec(line) : null;
    const content = heading ? heading[2] : line;
    const runSize = heading ? Math.max(fontSize * 2, 32 - (heading[1].length - 1) * 2) : fontSize * 2;
    const paragraphProperties = heading
      ? `<w:pPr><w:outlineLvl w:val="${heading[1].length - 1}"/><w:spacing w:after="160"/></w:pPr>`
      : '';
    const runProperties = `<w:rPr><w:rFonts w:ascii="${font}" w:hAnsi="${font}"/><w:sz w:val="${runSize}"/>${heading ? '<w:b/>' : ''}</w:rPr>`;
    return `<w:p>${paragraphProperties}<w:r>${runProperties}<w:t xml:space="preserve">${escapeXml(content)}</w:t></w:r></w:p>`;
  }).join('');
  const pageSizes = {
    letter: { width: 12240, height: 15840 },
    a4: { width: 11906, height: 16838 },
  };
  const marginSizes = { normal: 1440, narrow: 720, wide: 2160 };
  const page = pageSizes[documentPageSize.value] || pageSizes.letter;
  const margin = marginSizes[documentMargins.value] || marginSizes.normal;
  const zip = new JSZip();
  zip.file('[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>');
  zip.file('_rels/.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>');
  zip.file('word/document.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${paragraphs}<w:sectPr><w:pgSz w:w="${page.width}" w:h="${page.height}"/><w:pgMar w:top="${margin}" w:right="${margin}" w:bottom="${margin}" w:left="${margin}"/></w:sectPr></w:body></w:document>`);
  return zip.generateAsync({
    type: 'blob',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    compression: 'DEFLATE',
    compressionOptions: { level: Number(documentCompression.value) },
  });
}

async function textToPdf(text) {
  const { PDFDocument, StandardFonts } = await loadPdfLib();
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontSize = 11;
  const lineHeight = 15;
  const pageWidth = 612;
  const pageHeight = 792;
  const margin = 48;
  const maxWidth = pageWidth - margin * 2;
  const safeText = text.replace(/\t/g, '    ').replace(/[^\x0a\x0d\x20-\x7e\xa0-\xff]/g, '?');
  let page = pdf.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;
  const writeLine = line => {
    if (y < margin) {
      page = pdf.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
    page.drawText(line, { x: margin, y, size: fontSize, font });
    y -= lineHeight;
  };
  for (const sourceLine of safeText.replace(/\r\n?/g, '\n').split('\n')) {
    let line = '';
    for (const word of sourceLine.split(/(\s+)/)) {
      if (font.widthOfTextAtSize(word, fontSize) > maxWidth) {
        if (line) writeLine(line.trimEnd());
        line = '';
        for (const character of word) {
          if (line && font.widthOfTextAtSize(line + character, fontSize) > maxWidth) {
            writeLine(line);
            line = character.trimStart();
          } else {
            line += character;
          }
        }
      } else if (line && font.widthOfTextAtSize(line + word, fontSize) > maxWidth) {
        writeLine(line);
        line = word.trimStart();
      } else {
        line += word;
      }
    }
    if (line) writeLine(line);
    else writeLine('');
  }
  return new Blob([await pdf.save({ useObjectStreams: true })], { type: 'application/pdf' });
}

function textToRtf(text) {
  const escaped = text.replace(/[\\{}]/g, character => `\\${character}`)
    .replace(/[^\x00-\x7f]/g, character => `\\u${character.charCodeAt(0) > 32767 ? character.charCodeAt(0) - 65536 : character.charCodeAt(0)}?`)
    .replace(/\r\n?|\n/g, '\\par\n');
  return new Blob([`{\\rtf1\\ansi\\deff0\\uc1 ${escaped}}`], { type: 'application/rtf;charset=utf-8' });
}

function rtfToText(rtf) {
  const destinations = new Set([
    'annotation', 'colortbl', 'datastore', 'field', 'filetbl', 'fonttbl',
    'footer', 'footerf', 'footerl', 'footerr', 'header', 'headerf', 'headerl',
    'headerr', 'info', 'listoverridetable', 'listtable', 'object', 'pict',
    'revtbl', 'stylesheet', 'xmlclose', 'xmlname', 'xmlopen',
  ]);
  const stack = [];
  let state = { skip: false, unicodeFallback: 1, atStart: true };
  let ignoreNextGroup = false;
  let fallbackToSkip = 0;
  let output = '';
  for (let index = 0; index < rtf.length; index += 1) {
    const character = rtf[index];
    if (character === '{') {
      stack.push(state);
      state = { ...state, skip: state.skip || ignoreNextGroup, atStart: true };
      ignoreNextGroup = false;
      continue;
    }
    if (character === '}') {
      state = stack.pop() || { skip: false, unicodeFallback: 1, atStart: true };
      continue;
    }
    if (character !== '\\') {
      if (character === '\r' || character === '\n') continue;
      if (fallbackToSkip) fallbackToSkip -= 1;
      else if (!state.skip) output += character;
      if (!/\s/.test(character)) state.atStart = false;
      continue;
    }
    const next = rtf[index + 1];
    if (next === '\\' || next === '{' || next === '}') {
      index += 1;
      if (fallbackToSkip) fallbackToSkip -= 1;
      else if (!state.skip) output += next;
      continue;
    }
    if (next === '*') {
      index += 1;
      ignoreNextGroup = true;
      continue;
    }
    if (next === "'" && /^[0-9a-f]{2}$/i.test(rtf.slice(index + 2, index + 4))) {
      const code = parseInt(rtf.slice(index + 2, index + 4), 16);
      index += 3;
      if (fallbackToSkip) fallbackToSkip -= 1;
      else if (!state.skip) output += new TextDecoder('windows-1252').decode(Uint8Array.of(code));
      continue;
    }
    const control = /^([a-zA-Z]+)(-?\d+)? ?/.exec(rtf.slice(index + 1));
    if (!control) {
      index += 1;
      if (fallbackToSkip) fallbackToSkip -= 1;
      else if (!state.skip && next === '~') output += '\u00a0';
      else if (!state.skip && next === '_') output += '\u2011';
      else if (!state.skip && next !== '-') output += next || '';
      continue;
    }
    index += control[0].length;
    const word = control[1].toLowerCase();
    const parameter = control[2] ? Number(control[2]) : null;
    if (ignoreNextGroup || (state.atStart && destinations.has(word))) state.skip = true;
    ignoreNextGroup = false;
    state.atStart = false;
    if (word === 'uc' && parameter !== null) state.unicodeFallback = parameter;
    if (state.skip) continue;
    if (word === 'u' && parameter !== null) {
      output += String.fromCharCode(parameter < 0 ? parameter + 65536 : parameter);
      fallbackToSkip = state.unicodeFallback;
    } else if (fallbackToSkip) {
      continue;
    } else if (word === 'par' || word === 'line') {
      output += '\n';
    } else if (word === 'tab') {
      output += '\t';
    }
  }
  return output.replace(/\r\n?/g, '\n').trim();
}

function textToHtml(text) {
  const safe = escapeXml(text);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Converted document</title></head><body><pre>${safe}</pre></body></html>`;
}

async function readDocumentSource(file) {
  const inputExtension = extension(file.name);
  sourceDocumentHtml = '';
  if (!DOCUMENT_PARSED_INPUTS.has(inputExtension)) {
    throw new Error(`.${inputExtension} files are accepted, but reading this binary or proprietary format is unavailable in this browser converter.`);
  }
  if (inputExtension === 'docx') {
    setStatus('Loading Word document reader...');
    await loadScript('https://unpkg.com/mammoth@1.8.0/mammoth.browser.min.js');
    if (!globalThis.mammoth) throw new Error('The DOCX reader is unavailable.');
    const arrayBuffer = await file.arrayBuffer();
    const result = await globalThis.mammoth.extractRawText({ arrayBuffer });
    sourceDocumentHtml = (await globalThis.mammoth.convertToHtml({ arrayBuffer })).value;
    return result.value;
  }
  if (inputExtension === 'pdf') {
    if (file.size > 100 * 1024 * 1024) throw new Error('PDF documents must be 100 MB or smaller.');
    const pdfjs = await loadPdfJs();
    const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
    if (pdf.numPages > 100) throw new Error('PDF documents are limited to 100 pages for text extraction.');
    const pages = [];
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      setStatus(`Extracting PDF text, page ${pageNumber} of ${pdf.numPages}...`);
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();
      pages.push(content.items.map(item => item.str || '').join(' '));
    }
    const text = pages.join('\n\n');
    if (!text.trim()) throw new Error('No selectable text was found in this PDF. Scanned PDFs need OCR before they can be converted here.');
    return text;
  }
  const text = await file.text();
  if (inputExtension === 'rtf') return rtfToText(text);
  if (inputExtension === 'html' || inputExtension === 'htm') {
    sourceDocumentHtml = text;
    return htmlToPlainText(text);
  }
  return text;
}

function htmlToPlainText(html) {
  const parsed = new DOMParser().parseFromString(html, 'text/html');
  parsed.querySelectorAll('script, style, noscript, template').forEach(node => node.remove());
  const blockTags = new Set([
    'ADDRESS', 'ARTICLE', 'BLOCKQUOTE', 'DD', 'DIV', 'DL', 'DT', 'FIELDSET',
    'FIGCAPTION', 'FIGURE', 'FOOTER', 'FORM', 'H1', 'H2', 'H3', 'H4', 'H5',
    'H6', 'HEADER', 'LI', 'MAIN', 'NAV', 'OL', 'P', 'PRE', 'SECTION', 'TABLE',
    'TR', 'UL',
  ]);
  const collectText = node => {
    if (node.nodeType === Node.TEXT_NODE) return node.nodeValue;
    if (node.nodeType !== Node.ELEMENT_NODE) return '';
    if (node.tagName === 'BR') return '\n';
    const childrenText = Array.from(node.childNodes, collectText).join('');
    return blockTags.has(node.tagName) ? `${childrenText.trim()}\n` : childrenText;
  };
  return collectText(parsed.body).replace(/\n{3,}/g, '\n\n').trim();
}

function renderDocumentText(container, text, detectHeadings) {
  const fragment = document.createDocumentFragment();
  text.split(/\r?\n/).forEach(line => {
    const heading = detectHeadings ? /^(#{1,6})\s+(.+)$/.exec(line) : null;
    const block = document.createElement(heading ? `h${heading[1].length}` : 'p');
    block.textContent = heading ? heading[2] : (line || '\u00a0');
    block.className = heading ? 'my-2 font-bold text-slate-900' : 'my-1 whitespace-pre-wrap';
    fragment.appendChild(block);
  });
  container.replaceChildren(fragment);
}

function documentWordCount(text) {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

async function createDocumentOutputBlob(file, rawText) {
  const format = outputFormat.value;
  if (!DOCUMENT_OUTPUTS.has(format)) {
    throw new Error(`.${format} export is unavailable in this browser converter.`);
  }
  if (format === 'pdf') {
    return textToPdf(rawText);
  }
  if (format === 'docx') {
    return textToDocx(rawText);
  }
  if (format === 'rtf') {
    return textToRtf(rawText);
  }
  if (format === 'html' || format === 'htm') {
    const inputExtension = extension(file.name);
    const html = inputExtension === 'html' || inputExtension === 'htm'
      ? sourceDocumentHtml
      : inputExtension === 'docx'
        ? `<!doctype html><html><head><meta charset="utf-8"></head><body>${sourceDocumentHtml}</body></html>`
        : textToHtml(rawText);
    return new Blob([html], { type: 'text/html;charset=utf-8' });
  }
  return new Blob([rawText.replace(/\r\n/g, '\n')], { type: 'text/plain;charset=utf-8' });
}

async function createDocumentZipBlob(file) {
  const JSZip = await loadZip();
  const archive = new JSZip();
  archive.file(file.name, file);
  return archive.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: Number(document.getElementById('compressionLevel').value) },
  });
}

function refreshDocumentPreview() {
  if (activeType !== 'document' || !files.length) return;
  clearOutput();
  renderDocumentPreview(files[0]);
}

async function renderDocumentPreview(file) {
  const revision = ++documentPreviewRevision;
  const pdfInput = isPdfFile(file);
  documentOutputBlob = null;
  sourceDocumentPreview.classList.toggle('hidden', pdfInput);
  sourcePreview.classList.toggle('hidden', !pdfInput);
  sourcePreview.alt = pdfInput ? 'First page preview of original PDF document' : 'Selected file preview';
  convertedPreview.alt = 'Converted file preview';
  sourceVideoPreview.classList.add('hidden');
  sourceFileBadge.classList.add('hidden');
  convertedPreview.classList.add('hidden');
  convertedVideoFrame.classList.add('hidden');
  outputDocumentPreview.classList.remove('hidden');
  sourceFileQualityLabel.textContent = pdfInput ? 'PDF page preview' : 'Source content';
  sourceFileQuality.textContent = pdfInput ? 'Page 1' : 'Text extracted for preview';
  sourceQualityRow.classList.remove('hidden');
  sourceAspectRatioRow.classList.add('hidden');
  sourceDurationRow.classList.add('hidden');
  outputAspectRatioRow.classList.add('hidden');
  sourceFileDimensionsLabel.textContent = 'Document stats';
  outputPreviewDimensionsLabel.textContent = 'Document stats';
  outputQualityLabel.textContent = outputFormat.value === 'docx' ? 'DOCX compression' : 'Quality';
  outputPreviewName.textContent = `${baseName(file)}.${outputFormat.value}`;
  outputPreviewType.textContent = outputFormat.options[outputFormat.selectedIndex]?.textContent || outputFormat.value;
  outputPreviewSize.textContent = 'Updating preview...';
  resizePreview.classList.remove('hidden');
  setStatus('Updating document output preview...');
  if (pdfInput) {
    try {
      if (documentPdfPreviewFile === file && sourcePreviewUrl) {
        sourcePreview.src = sourcePreviewUrl;
        sourcePreview.classList.remove('hidden');
        sourceDocumentPreview.classList.add('hidden');
        sourceFileDimensions.textContent = documentPdfPreviewDimensions;
        sourcePreview.alt = 'First page preview of original PDF document';
      } else {
        const canvas = await loadPdfImage(file);
        if (revision !== documentPreviewRevision || files[0] !== file || activeType !== 'document') return;
        const pageBlob = await canvasBlob(canvas, 'image/png');
        if (revision !== documentPreviewRevision || files[0] !== file || activeType !== 'document') return;
        if (sourcePreviewUrl) URL.revokeObjectURL(sourcePreviewUrl);
        sourcePreviewUrl = URL.createObjectURL(pageBlob);
        documentPdfPreviewFile = file;
        documentPdfPreviewDimensions = `${canvas.width} × ${canvas.height}px`;
        sourcePreview.src = sourcePreviewUrl;
        sourcePreview.classList.remove('hidden');
        sourceDocumentPreview.classList.add('hidden');
        sourceFileDimensions.textContent = documentPdfPreviewDimensions;
        sourcePreview.alt = 'First page preview of original PDF document';
      }
    } catch (error) {
      if (revision !== documentPreviewRevision) return;
      sourcePreview.classList.add('hidden');
      sourceDocumentPreview.classList.remove('hidden');
      sourceDocumentPreview.textContent = `The first PDF page could not be rendered as an image. ${error.message || ''}`.trim();
      sourceFileDimensions.textContent = formatBytes(file.size);
      setStatus(error.message || 'Could not render the PDF page preview.', true);
    }
  }
  if (outputFormat.value === 'document-zip') {
    sourceFileQualityLabel.textContent = 'Source file';
    sourceFileQuality.textContent = formatFileType(file);
    sourceFileDimensions.textContent = formatBytes(file.size);
    sourceDocumentPreview.textContent = `Package the original ${extension(file.name).toUpperCase()} file into a ZIP archive.`;
    outputDocumentPreview.textContent = 'ZIP compression can reduce some files, but already-compressed formats may stay the same size or become slightly larger.';
    outputQualityLabel.textContent = 'ZIP compression';
    outputPreviewName.textContent = `${baseName(file)}.zip`;
    outputPreviewType.textContent = 'ZIP archive';
    outputPreviewSize.textContent = 'Calculating compressed size...';
    outputPreviewQuality.textContent = `Level ${document.getElementById('compressionLevel').value}/9`;
    outputPreviewAspectRatio.textContent = '';
    outputPreviewDimensions.textContent = `${formatBytes(file.size)} source file`;
    resizePreview.classList.remove('hidden');
    setStatus('Calculating ZIP output size...');
    try {
      const outputBlob = await createDocumentZipBlob(file);
      if (revision !== documentPreviewRevision || files[0] !== file || activeType !== 'document') return;
      documentOutputBlob = outputBlob;
      const change = ((outputBlob.size - file.size) / Math.max(file.size, 1)) * 100;
      const changeLabel = change <= 0
        ? `${Math.abs(change).toFixed(1)}% smaller`
        : `${change.toFixed(1)}% larger`;
      outputPreviewSize.textContent = `${formatBytes(outputBlob.size)} · ${changeLabel}`;
      outputPreviewSize.title = 'ZIP size compared with the original document. ZIP may be larger for already-compressed formats.';
      setStatus('ZIP output preview updated.', false, true);
    } catch (error) {
      if (revision === documentPreviewRevision) setStatus(error.message || 'Could not calculate ZIP output size.', true);
    }
    return;
  }
  if (isPdfFile(file) && (
    outputFormat.value === 'pdf'
    || outputFormat.value === 'pdf-compressed'
    || isPdfPageExport(outputFormat.value)
  )) {
    sourceFileQualityLabel.textContent = 'Source document';
    sourceFileQuality.textContent = 'PDF';
    if (!documentPdfPreviewFile) sourceFileDimensions.textContent = formatBytes(file.size);
    const pdfOutputDescription = outputFormat.value === 'pdf'
      ? 'Keep the original PDF unchanged.'
      : outputFormat.value === 'pdf-compressed'
        ? 'Rebuild the PDF pages as optimized images and save them in a compressed PDF.'
        : `Export each PDF page as ${outputFormat.value === 'pdf-pngzip' ? 'PNG' : 'JPEG'} and bundle the images into a ZIP archive.`;
    if (documentPdfPreviewFile === file && sourcePreviewUrl) {
      convertedPreview.src = sourcePreviewUrl;
      convertedPreview.classList.remove('hidden');
      convertedPreview.alt = 'First page preview of PDF output';
      outputDocumentPreview.classList.add('hidden');
    } else {
      outputDocumentPreview.textContent = pdfOutputDescription;
      outputDocumentPreview.classList.remove('hidden');
    }
    outputPreviewName.textContent = outputFormat.value === 'pdf'
      ? file.name
      : outputFormat.value === 'pdf-compressed'
        ? `${baseName(file)}-compressed.pdf`
        : `${baseName(file)}-pages.zip`;
    outputPreviewType.textContent = outputFormat.options[outputFormat.selectedIndex].textContent;
    outputPreviewSize.textContent = outputFormat.value === 'pdf' ? formatBytes(file.size) : 'Calculated during conversion';
    outputPreviewQuality.textContent = outputFormat.value === 'pdf'
      ? 'Original (unchanged)'
      : outputFormat.value === 'pdf-compressed'
        ? `${qualityRange.value}% page quality`
        : `${outputFormat.value === 'pdf-jpgzip' ? `${qualityRange.value}% JPEG · ` : ''}ZIP level ${document.getElementById('compressionLevel').value}/9`;
    outputPreviewAspectRatio.textContent = '';
    outputPreviewDimensions.textContent = outputFormat.value === 'pdf'
      ? 'Original PDF pages'
      : `PDF pages · max width ${document.getElementById('resizeWidth').value}px`;
    resizePreview.classList.remove('hidden');
    setStatus('PDF export options ready.', false, true);
    return;
  }
  try {
    if (sourceDocumentFile !== file) {
      sourceDocumentText = await readDocumentSource(file);
      sourceDocumentFile = file;
    }
    if (revision !== documentPreviewRevision || files[0] !== file || activeType !== 'document') return;
    if (!pdfInput) {
      renderDocumentText(sourceDocumentPreview, sourceDocumentText, false);
      sourceFileDimensions.textContent = `${documentWordCount(sourceDocumentText)} words · ${sourceDocumentText.length} characters`;
    }
    const format = outputFormat.value;
    const sourceFormat = extension(file.name);
    const unchanged = format === sourceFormat && DOCUMENT_OUTPUTS.has(format);
    let outputBlob;
    if (unchanged) {
      outputBlob = file;
    } else {
      setStatus('Preparing document output preview...');
      outputBlob = await createDocumentOutputBlob(file, sourceDocumentText);
    }
    if (revision !== documentPreviewRevision || files[0] !== file || activeType !== 'document') return;
    documentOutputBlob = outputBlob;
    const detectHeadings = format === 'docx' && documentHeadings.value === 'markdown';
    renderDocumentText(outputDocumentPreview, sourceDocumentText, detectHeadings);
    outputDocumentPreview.style.fontFamily = !unchanged && format === 'docx' ? documentFont.value : '';
    outputDocumentPreview.style.fontSize = !unchanged && format === 'docx' ? `${documentFontSize.value}pt` : '';
    outputDocumentPreview.style.padding = !unchanged && format === 'docx'
      ? ({ normal: '1.5rem', narrow: '0.75rem', wide: '2.25rem' })[documentMargins.value]
      : '';
    outputPreviewName.textContent = unchanged ? file.name : `${baseName(file)}.${format}`;
    outputPreviewType.textContent = outputFormat.options[outputFormat.selectedIndex].textContent;
    outputPreviewSize.textContent = formatBytes(outputBlob.size);
    outputPreviewQuality.textContent = unchanged
      ? 'Original (unchanged)'
      : format === 'docx'
        ? `ZIP level ${documentCompression.value}/9`
        : 'Not applicable for this format';
    outputPreviewAspectRatio.textContent = '';
    outputPreviewDimensions.textContent = `${documentWordCount(sourceDocumentText)} words · ${sourceDocumentText.length} characters`;
    resizePreview.classList.remove('hidden');
    setStatus('Document output preview updated.', false, true);
  } catch (error) {
    if (revision === documentPreviewRevision) setStatus(error.message || 'Could not preview this document.', true);
  }
}

async function convertDocument() {
  const file = files[0];
  if (!file) throw new Error('Choose a document to convert.');
  if (outputFormat.value === 'document-zip') {
    if (!documentOutputBlob) await renderDocumentPreview(file);
    if (!documentOutputBlob) throw new Error('The ZIP output preview is not ready. Please try again.');
    download(documentOutputBlob, `${baseName(file)}.zip`);
    return;
  }
  if (isPdfFile(file) && (
    outputFormat.value === 'pdf'
    || outputFormat.value === 'pdf-compressed'
    || isPdfPageExport(outputFormat.value)
  )) {
    if (outputFormat.value === 'pdf') {
      download(file, `${baseName(file)}.pdf`);
    } else {
      await convertPdf(file, outputFormat.value);
    }
    return;
  }
  if (!documentOutputBlob) {
    await renderDocumentPreview(file);
  }
  if (!documentOutputBlob) throw new Error('The document preview is not ready. Please try again.');
  const unchanged = outputFormat.value === extension(file.name) && DOCUMENT_OUTPUTS.has(outputFormat.value);
  download(documentOutputBlob, unchanged ? file.name : `${baseName(file)}.${outputFormat.value}`);
}

async function loadZip() {
  setStatus('Loading ZIP tools...');
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js');
  if (!globalThis.JSZip) throw new Error('The ZIP library is unavailable.');
  return globalThis.JSZip;
}

async function convertArchive() {
  const JSZip = await loadZip();
  const archive = new JSZip();
  if (files.length === 1 && extension(files[0].name) === 'zip') {
    const loaded = await JSZip.loadAsync(await files[0].arrayBuffer());
    for (const [name, item] of Object.entries(loaded.files)) {
      if (!item.dir) archive.file(name, await item.async('uint8array'));
    }
  } else {
    files.forEach(file => archive.file(file.name, file));
  }
  const blob = await archive.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: Number(document.getElementById('compressionLevel').value) },
  });
  download(blob, files.length === 1 && extension(files[0].name) === 'zip' ? `${baseName(files[0])}-optimized.zip` : 'converted-files.zip');
}

async function loadXlsx() {
  setStatus('Loading spreadsheet tools...');
  await loadScript('https://unpkg.com/xlsx@0.18.5/dist/xlsx.full.min.js');
  if (!globalThis.XLSX) throw new Error('The spreadsheet library is unavailable.');
  return globalThis.XLSX;
}

async function convertData() {
  const XLSX = await loadXlsx();
  const file = files[0];
  let workbook;
  if (extension(file.name) === 'json') {
    const data = JSON.parse(await file.text());
    const rows = Array.isArray(data) ? data : Array.isArray(data.rows) ? data.rows : [data];
    const sheet = Array.isArray(rows[0]) ? XLSX.utils.aoa_to_sheet(rows) : XLSX.utils.json_to_sheet(rows);
    workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');
  } else {
    workbook = XLSX.read(await file.arrayBuffer(), { type: 'array' });
  }
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  if (!firstSheet) throw new Error('No worksheet was found in this file.');
  const format = outputFormat.value;
  let blob;
  if (format === 'xlsx') {
    const bytes = XLSX.write(workbook, { bookType: 'xlsx', type: 'array', compression: true });
    blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  } else if (format === 'json') {
    const rows = XLSX.utils.sheet_to_json(firstSheet, { defval: '' });
    blob = new Blob([JSON.stringify(rows, null, 2)], { type: 'application/json;charset=utf-8' });
  } else {
    blob = new Blob([XLSX.utils.sheet_to_csv(firstSheet)], { type: 'text/csv;charset=utf-8' });
  }
  download(blob, `${baseName(file)}.${format}`);
}

async function getFFmpeg() {
  if (ffmpegInstance) return ffmpegInstance;
  setStatus('Loading media codec. The first download may be large...');
  await loadScript('https://unpkg.com/@ffmpeg/ffmpeg@0.11.6/dist/ffmpeg.min.js');
  if (!globalThis.FFmpeg?.createFFmpeg) throw new Error('The media codec could not be initialized.');
  ffmpegInstance = globalThis.FFmpeg.createFFmpeg({
    log: false,
    corePath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js',
  });
  await ffmpegInstance.load();
  return ffmpegInstance;
}

async function convertMedia() {
  if (files.length !== 1) throw new Error('Choose one audio or video file.');
  if (files[0].size > 200 * 1024 * 1024) throw new Error('Media files must be 200 MB or smaller in this browser converter.');
  const ffmpeg = await getFFmpeg();
  const file = files[0];
  const inputExtension = extension(file.name);
  const inputName = `input.${inputExtension}`;
  const format = outputFormat.value;
  const outputName = `output.${format}`;
  const bitrate = Number(document.getElementById('mediaBitrate').value);
  const inputDemuxer = activeType === 'video' ? VIDEO_INPUT_DEMUXERS[inputExtension] : null;
  const args = inputDemuxer ? ['-f', inputDemuxer, '-i', inputName] : ['-i', inputName];
  if (activeType === 'audio') {
    if (!isAudioFile(file)) throw new Error('Choose an audio file in the Audio converter.');
    const audioProfile = VIDEO_AUDIO_OUTPUT_PROFILES[format];
    if (!audioProfile) throw new Error(`.${format} export is unavailable in this browser converter.`);
    args.push('-vn', '-c:a', audioProfile.codec);
    if (audioProfile.bitrate) args.push('-b:a', `${bitrate}k`);
    args.push('-f', audioProfile.muxer);
  } else {
    if (!isVideoFile(file)) throw new Error('Choose a video file in the Video converter.');
    const audioProfile = VIDEO_AUDIO_OUTPUT_PROFILES[format];
    if (audioProfile) {
      args.push('-map', '0:a:0', '-vn', '-c:a', audioProfile.codec);
      if (audioProfile.bitrate) args.push('-b:a', `${bitrate}k`);
      args.push('-f', audioProfile.muxer);
    } else {
      const profile = VIDEO_OUTPUT_PROFILES[format];
      if (!profile) throw new Error(`${format.toUpperCase()} export is unavailable in this browser converter.`);
      if (videoSourceDimensions) {
        const { width, height } = videoTargetDimensions();
        const sourceWidth = videoSourceDimensions.width;
        const sourceHeight = videoSourceDimensions.height;
        const ratio = width / height;
        const sourceRatio = sourceWidth / sourceHeight;
        const cropWidth = Math.max(2, Math.floor((sourceRatio > ratio ? sourceHeight * ratio : sourceWidth) / 2) * 2);
        const cropHeight = Math.max(2, Math.floor((sourceRatio > ratio ? sourceHeight : sourceWidth / ratio) / 2) * 2);
        const cropX = Math.max(0, Math.floor((sourceWidth - cropWidth) / 4) * 2);
        const cropY = Math.max(0, Math.floor((sourceHeight - cropHeight) / 4) * 2);
        args.push('-vf', `crop=${cropWidth}:${cropHeight}:${cropX}:${cropY},scale=${width}:${height}`);
      }
      args.push('-c:v', profile.video);
      if (profile.video === 'libx264') args.push('-preset', 'ultrafast');
      const outputBitrate = videoBitrateForDimensions(
        bitrate,
        videoSourceDimensions ? videoTargetDimensions() : null,
      );
      args.push('-b:v', `${outputBitrate}k`);
      if (profile.audio) {
        const audioBitrate = Number(document.getElementById('videoAudioBitrate').value);
        args.push('-c:a', profile.audio, '-b:a', `${audioBitrate}k`);
      } else {
        args.push('-an');
      }
      if (profile.faststart) args.push('-movflags', '+faststart');
      args.push('-f', profile.muxer);
    }
  }

  ffmpeg.setProgress(({ ratio }) => setStatus(`Transcoding media... ${Math.round(ratio * 100)}%`));
  try {
    ffmpeg.FS('writeFile', inputName, await globalThis.FFmpeg.fetchFile(file));
    setStatus('Transcoding media...');
    await ffmpeg.run(...args, outputName);
    const result = ffmpeg.FS('readFile', outputName);
    const mime = activeType === 'video'
      ? VIDEO_AUDIO_OUTPUT_PROFILES[format]?.mime || VIDEO_OUTPUT_PROFILES[format].mime
      : VIDEO_AUDIO_OUTPUT_PROFILES[format].mime;
    download(new Blob([result], { type: mime }), `${baseName(file)}.${format}`);
  } finally {
    try { ffmpeg.FS('unlink', inputName); } catch (error) { /* The virtual input may not exist after a failed load. */ }
    try { ffmpeg.FS('unlink', outputName); } catch (error) { /* The virtual output may not exist after a failed encode. */ }
  }
}

async function convertFiles() {
  if (!files.length) return;
  convertBtn.disabled = true;
  clearOutput();
  try {
    setStatus('Preparing conversion...');
    if (activeType === 'image') await convertImage();
    if (activeType === 'document') await convertDocument();
    if (activeType === 'audio' || activeType === 'video') await convertMedia();
    if (activeType === 'archive') await convertArchive();
    if (activeType === 'data') await convertData();
    setStatus('Ready to download.', false, true);
  } catch (error) {
    console.error('File conversion failed:', error);
    setStatus(error.message || 'Conversion failed. Try a different file or output format.', true);
  } finally {
    convertBtn.disabled = files.length === 0;
  }
}

document.querySelectorAll('.converter-tab').forEach(tab => tab.addEventListener('click', () => updateType(tab.dataset.type)));
fileDrop.addEventListener('click', () => fileInput.click());
fileDrop.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    fileInput.click();
  }
});
fileDrop.tabIndex = 0;
fileDrop.setAttribute('role', 'button');
fileInput.addEventListener('change', event => acceptFiles(event.target.files));
fileDrop.addEventListener('dragover', event => {
  event.preventDefault();
  fileDrop.classList.add('border-brand-500', 'bg-brand-50');
});
fileDrop.addEventListener('dragleave', () => fileDrop.classList.remove('border-brand-500', 'bg-brand-50'));
fileDrop.addEventListener('drop', event => {
  event.preventDefault();
  fileDrop.classList.remove('border-brand-500', 'bg-brand-50');
  acceptFiles(event.dataTransfer.files);
});
qualityRange.addEventListener('input', () => {
  qualityValue.textContent = `${qualityRange.value}%`;
  if (isImageConversionContext()) {
    imageSettingsTouched = true;
    refreshImagePreview();
  } else if (activeType === 'document' && hasPdfInput()) {
    refreshDocumentPreview();
  }
});
documentCompression.addEventListener('input', () => {
  documentCompressionValue.textContent = documentCompression.value;
  refreshDocumentPreview();
});
[
  documentFont,
  documentFontSize,
  documentPageSize,
  documentMargins,
  documentHeadings,
].forEach(control => control.addEventListener('change', () => {
  refreshDocumentPreview();
}));
imageAspectRatio.addEventListener('change', () => {
  populateImageDimensions();
  if (isImageConversionContext()) {
    imageSettingsTouched = true;
    scheduleImagePreview();
  }
});
imageDimensions.addEventListener('change', () => {
  if (isImageConversionContext()) {
    imageSettingsTouched = true;
    scheduleImagePreview();
  }
});
outputFormat.addEventListener('change', () => {
  clearOutput();
  updateImageControls();
  if (isImageConversionContext()) {
    imageSettingsTouched = true;
    scheduleImagePreview();
  } else if (activeType === 'video') {
    updateVideoOutputControls();
    renderVideoOutputPreview();
  } else if (activeType === 'audio' && files.length) {
    renderAudioOutputPreview();
  } else if (activeType === 'document' && files.length) {
    refreshDocumentPreview();
  }
});
videoAspectRatio.addEventListener('change', () => {
  populateVideoDimensions();
  clearOutput();
  renderVideoOutputPreview();
});
videoDimensions.addEventListener('change', () => {
  clearOutput();
  renderVideoOutputPreview();
});
document.getElementById('mediaBitrate').addEventListener('change', () => {
  clearOutput();
  if (activeType === 'audio') renderAudioOutputPreview();
  else if (activeType === 'video') renderVideoOutputPreview();
});
document.getElementById('videoAudioBitrate').addEventListener('change', () => {
  clearOutput();
  renderVideoOutputPreview();
});
document.getElementById('resizeWidth').addEventListener('input', () => {
  if (isImageConversionContext()) scheduleImagePreview();
  else if (activeType === 'document' && hasPdfInput()) refreshDocumentPreview();
});
document.getElementById('compressionLevel').addEventListener('input', () => {
  if (activeType === 'image') scheduleImagePreview();
  else if (activeType === 'document' && files.length && (
    hasPdfInput() || outputFormat.value === 'document-zip'
  )) refreshDocumentPreview();
});
convertBtn.addEventListener('click', convertFiles);

updateType(activeType);