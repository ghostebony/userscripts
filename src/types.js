/**
 * @typedef {{getAvailableQualityLevels: () => string[]}} GetAvailableQualityLevels
 *
 * @typedef {{getPlaybackQuality: () => string}} GetPlaybackQuality
 *
 * @typedef {{loadVideoById: (video_id: string, current_time: number, quality: string) => void}} LoadVideoById
 *
 * @typedef {{getVideoData: () => { video_id: string }}} GetVideoData
 *
 * @typedef {{getCurrentTime: () => number}} GetCurrentTime
 *
 * @typedef {{setPlaybackQualityRange?: (quality_a: string, quality_b: string) => void}} SetPlaybackQualityRange
 *
 * @typedef {{setPlaybackQuality: (quality: string) => number}} SetPlaybackQuality
 *
 * @typedef {GetAvailableQualityLevels & GetPlaybackQuality & LoadVideoById & GetVideoData & GetCurrentTime & SetPlaybackQualityRange & SetPlaybackQuality} VideoPlayerMethods
 */
