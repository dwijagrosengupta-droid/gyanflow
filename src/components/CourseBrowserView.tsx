import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CourseClass, CourseSubject, CourseChapter } from '../types';
import NCERT_SYLLABUS from '../data/ncertSyllabus.json';
import { ChevronRight, ArrowLeft, BookOpen, Brain, Play, FileText } from 'lucide-react';
import Markdown from 'react-markdown';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { InteractiveMindmap } from './InteractiveMindmap';

export const CourseBrowserView: React.FC = () => {
  const { t, student, showToast } = useApp();
  const [selectedClass, setSelectedClass] = useState<CourseClass | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<CourseSubject | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<CourseChapter | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [aiMindmap, setAiMindmap] = useState<any>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const loadModuleContent = async (
    moduleName: string,
    className: string | undefined,
    subjectName: string | undefined,
    chapterName: string | undefined,
    pdfUrl: string | undefined
  ) => {
    setLoadingAi(true);
    setAiSummary(null);
    setAiMindmap(null);

    const docId = `${className}_${subjectName}_${chapterName}_${moduleName}`.replace(/[^a-zA-Z0-9_]/g, '_');

    let cached = null;
    try {
      const moduleRef = doc(db, 'modules', docId);
      const moduleSnap = await getDoc(moduleRef);
      if (moduleSnap.exists()) {
        cached = moduleSnap.data();
      }
    } catch (err) {
      console.warn('Firestore cache read failed, falling back to AI API:', err);
    }

    if (cached?.summary && cached?.mindmap) {
      setAiSummary(cached.summary);
      setAiMindmap(cached.mindmap);
      setLoadingAi(false);
      return;
    }

    try {
      const response = await fetch('/api/ai/module-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          className: className,
          subject: subjectName,
          chapter: chapterName,
          module: moduleName,
          pdfUrl: pdfUrl
        })
      });

      if (!response.ok) {
        throw new Error(`AI API returned status ${response.status}`);
      }

      const data = await response.json();
      setAiSummary(data.content.summary);
      setAiMindmap(data.content.mindmap);

      try {
        const moduleRef = doc(db, 'modules', docId);
        await setDoc(moduleRef, { summary: data.content.summary, mindmap: data.content.mindmap });
      } catch (err) {
        console.warn('Firestore cache write failed:', err);
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading AI content');
    } finally {
      setLoadingAi(false);
    }
  };

  const handleModuleClick = (moduleName: string, chapterName: string, pdfUrl: string | undefined) => {
    setSelectedModule(moduleName);
    loadModuleContent(
      moduleName,
      selectedClass?.className,
      selectedSubject?.name,
      chapterName,
      pdfUrl
    );
  };

  const resetSelection = () => {
    setSelectedClass(null);
    setSelectedSubject(null);
    setSelectedChapter(null);
    setSelectedModule(null);
  };

  // Render Module Content View
  if (selectedModule) {
    return (
      <div className="flex-1 h-screen overflow-y-auto p-4 md:p-8 space-y-6 pb-24">
        <button onClick={() => setSelectedModule(null)} className="flex items-center text-[#0059b9] hover:underline mb-4 font-bold">
          <ArrowLeft className="w-5 h-5 mr-1" /> {t('Back to Chapter')}
        </button>
        <h2 className="text-2xl font-bold text-[#1b1c1c]">{selectedModule}</h2>
        <div className="text-sm text-[#727784] mb-6">
          {selectedClass?.className} / {selectedSubject?.name} / {selectedChapter?.name}
        </div>

        {loadingAi ? (
           <div className="flex flex-col items-center justify-center p-12 space-y-4">
             <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#0059b9] border-t-transparent"></div>
             <p className="text-[#424753] font-medium">{t('AI is generating summary and mindmap...')}</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#c2c6d5]/40">
              <div className="flex items-center gap-2 mb-4 border-b border-[#c2c6d5]/40 pb-4">
                <Brain className="w-6 h-6 text-[#0059b9]" />
                <h3 className="text-lg font-bold text-[#1b1c1c]">{t('AI Summary')}</h3>
              </div>
              <div className="markdown-body prose max-w-none text-[#424753]">
                {aiSummary && <Markdown>{aiSummary}</Markdown>}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#c2c6d5]/40 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-4 border-b border-[#c2c6d5]/40 pb-4">
                <BookOpen className="w-6 h-6 text-[#2a6767]" />
                <h3 className="text-lg font-bold text-[#1b1c1c]">{t('AI Mindmap')}</h3>
              </div>
              <div className="flex-1 w-full h-[400px]">
                {aiMindmap && <InteractiveMindmap data={aiMindmap} key={selectedModule} />}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render Chapters & Modules List
  if (selectedSubject) {
    return (
      <div className="flex-1 h-screen overflow-y-auto p-4 md:p-8 space-y-6 pb-24">
        <button onClick={() => setSelectedSubject(null)} className="flex items-center text-[#0059b9] hover:underline mb-4 font-bold">
          <ArrowLeft className="w-5 h-5 mr-1" /> {t('Back to Subjects')}
        </button>
        <h2 className="text-2xl font-bold text-[#1b1c1c]">{selectedSubject.name}</h2>
        <div className="text-sm text-[#727784] mb-6">{selectedClass?.className}</div>

        <div className="space-y-4">
          {selectedSubject.chapters.map((chapter, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-[#c2c6d5]/40 overflow-hidden shadow-sm">
              <div className="bg-[#f6f3f2] p-4 border-b border-[#c2c6d5]/40 flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#1b1c1c]">Chapter {idx + 1}: {chapter.name}</h3>
                {chapter.pdfUrl && (
                  <a
                    href={chapter.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#0059b9] text-sm font-semibold rounded-lg border border-[#c2c6d5]/40 hover:bg-[#d7e2ff] transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    {t('Read Chapter PDF')}
                  </a>
                )}
              </div>
              <div className="p-2">
                {chapter.modules.map((module, mIdx) => (
                   <button
                     key={mIdx}
                     onClick={() => {
                       setSelectedChapter(chapter);
                       handleModuleClick(module, chapter.name, chapter.pdfUrl);
                     }}
                    className="w-full text-left p-3 hover:bg-[#d7e2ff]/30 rounded-xl transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#d7e2ff] flex items-center justify-center text-[#0059b9]">
                        <Play className="w-4 h-4 fill-current" />
                      </div>
                      <span className="font-medium text-[#1b1c1c]">{module}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#a1a8b5]" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render Subjects List
  if (selectedClass) {
    return (
      <div className="flex-1 h-screen overflow-y-auto p-4 md:p-8 space-y-6 pb-24">
        <button onClick={() => setSelectedClass(null)} className="flex items-center text-[#0059b9] hover:underline mb-4 font-bold">
          <ArrowLeft className="w-5 h-5 mr-1" /> {t('Back to Classes')}
        </button>
        <h2 className="text-2xl font-bold text-[#1b1c1c]">{selectedClass.className}</h2>
        <p className="text-[#727784] mb-6">{t('Select a subject to begin learning')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedClass.subjects.map((subject, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedSubject(subject)}
              className="bg-white p-6 rounded-2xl border border-[#c2c6d5]/40 shadow-sm hover:border-[#0059b9] hover:shadow-md transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#d7e2ff] flex items-center justify-center text-[#0059b9] mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1b1c1c] mb-1">{subject.name}</h3>
              <p className="text-sm text-[#727784]">{subject.chapters.length} {t('Chapters')}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Render Classes List
  return (
    <div className="flex-1 h-screen overflow-y-auto p-4 md:p-8 space-y-6 pb-24">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#1b1c1c]">{t('NCERT Syllabus')}</h2>
        <p className="text-[#727784] mt-1">{t('Select your class to explore chapters and AI modules.')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {NCERT_SYLLABUS.map((cls, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedClass(cls as CourseClass)}
            className="bg-white p-6 rounded-2xl border border-[#c2c6d5]/40 shadow-sm hover:border-[#0059b9] hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div>
              <h3 className="text-xl font-bold text-[#1b1c1c]">{cls.className}</h3>
              <p className="text-sm text-[#727784] mt-1">{cls.subjects.length} {t('Subjects')}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#f6f3f2] flex items-center justify-center group-hover:bg-[#d7e2ff] transition-colors">
              <ChevronRight className="w-5 h-5 text-[#a1a8b5] group-hover:text-[#0059b9]" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
