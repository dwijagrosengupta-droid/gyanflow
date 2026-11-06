import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Download,
  Wifi,
  WifiOff,
  HardDrive,
  FileText,
  Video,
  Headphones,
  CheckCircle2,
  Trash2,
  RefreshCw,
  Zap
} from 'lucide-react';

export const DownloadsView: React.FC = () => {
  const { isOffline, toggleOffline, downloads, toggleDownload, showToast, t } = useApp();

  const totalSizeMB = downloads
    .filter((d) => d.isDownloaded)
    .reduce((acc, curr) => acc + curr.sizeMB, 0);

  const storageLimitMB = 1000; // 1 GB allocated
  const storagePercent = Math.round((totalSizeMB / storageLimitMB) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#c2c6d5]/40 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#b1eeed] text-[#074f4f]">
              {t('Low-Bandwidth Mode')}
            </span>
            <span className="text-xs text-[#727784] font-medium">{t('Offline Storage Manager')}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#1b1c1c] mt-1">
            {t('Offline Downloads')} & Local Storage
          </h2>
        </div>

        {/* Sync Status Toggle */}
        <button
          onClick={toggleOffline}
          className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
            isOffline
              ? 'bg-[#ffdad6] text-[#ba1a1a] border border-[#ba1a1a]/30'
              : 'bg-[#b1eeed] text-[#074f4f] border border-[#2a6767]/30'
          }`}
        >
          {isOffline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
          <span>{isOffline ? 'Mode: Offline 2G/3G' : 'Mode: Online Cloud Sync'}</span>
        </button>
      </div>

      {/* Row 1: Storage Allocation & Sync Queue */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Storage Bar */}
        <div className="bg-white rounded-2xl p-6 border border-[#c2c6d5]/40 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <HardDrive className="w-5 h-5 text-[#0059b9]" />
              <h3 className="text-base font-bold text-[#1b1c1c]">{t('Local Storage Gauge')}</h3>
            </div>
            <span className="text-xs font-bold text-[#0059b9]">
              {totalSizeMB.toFixed(1)} MB / {storageLimitMB} MB
            </span>
          </div>

          <div className="w-full h-3 bg-[#f0eded] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0059b9] rounded-full transition-all duration-500"
              style={{ width: `${Math.max(storagePercent, 2)}%` }}
            />
          </div>

          <p className="text-xs text-[#727784]">
            Compressed offline assets (compressed WebP video, ePub text, and audio notes) allow
            learning without active internet connectivity.
          </p>
        </div>

        {/* Sync Queue */}
        <div className="bg-white rounded-2xl p-6 border border-[#c2c6d5]/40 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <RefreshCw className={`w-5 h-5 text-[#2a6767] ${isOffline ? '' : 'animate-spin'}`} />
              <h3 className="text-base font-bold text-[#1b1c1c]">{t('Pending Sync Queue')}</h3>
            </div>
            <span className="text-xs font-bold bg-[#b1eeed]/50 text-[#074f4f] px-2.5 py-1 rounded-full">
              {isOffline ? '3 Items Queued' : 'Synced'}
            </span>
          </div>

          <div className="space-y-2 text-xs text-[#424753]">
            <div className="flex justify-between p-2 rounded-lg bg-[#f6f3f2]">
              <span>Quiz Session: Water Cycle (8/10)</span>
              <span className="font-bold text-[#0059b9]">{isOffline ? 'Queued' : 'Synced ✓'}</span>
            </div>
            <div className="flex justify-between p-2 rounded-lg bg-[#f6f3f2]">
              <span>Streak Log: Day 14</span>
              <span className="font-bold text-[#0059b9]">{isOffline ? 'Queued' : 'Synced ✓'}</span>
            </div>
          </div>

          <button
            onClick={() => showToast(isOffline ? 'Cannot sync while offline!' : 'All offline data synced to cloud!')}
            className="w-full bg-[#f6f3f2] hover:bg-[#eae8e7] text-[#0059b9] font-bold py-2 rounded-xl text-xs transition-colors"
          >
            {isOffline ? t('Connect to Internet to Sync') : t('Force Sync Now')}
          </button>
        </div>
      </div>

      {/* Row 2: Offline Downloaded Materials */}
      <div className="bg-white rounded-2xl p-6 border border-[#c2c6d5]/40 shadow-xs space-y-4">
        <h3 className="text-lg font-bold text-[#1b1c1c]">{t('Downloaded Lessons & Materials')}</h3>

        <div className="space-y-3">
          {downloads.map((item) => (
            <div
              key={item.id}
              className="bg-[#f6f3f2] p-4 rounded-xl border border-[#c2c6d5]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#d7e2ff] text-[#0059b9] flex items-center justify-center shrink-0 font-bold">
                  {item.fileType.includes('Video') && <Video className="w-5 h-5" />}
                  {item.fileType.includes('Text') && <FileText className="w-5 h-5" />}
                  {item.fileType.includes('Audio') && <Headphones className="w-5 h-5" />}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#1b1c1c]">{item.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-[#727784] mt-0.5">
                    <span>{item.fileType}</span>
                    <span>•</span>
                    <span>{item.sizeMB} MB</span>
                    <span>•</span>
                    <span>{item.downloadDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <button
                  onClick={() => toggleDownload(item.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    item.isDownloaded
                      ? 'bg-[#ffdad6]/60 text-[#ba1a1a] hover:bg-[#ffdad6]'
                      : 'bg-[#0059b9] text-white hover:bg-[#2f72d6]'
                  }`}
                >
                  {item.isDownloaded ? (
                    <>
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{t('Remove')}</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>{t('Download')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
