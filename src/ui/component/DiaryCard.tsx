'use client';
import { Diary } from '@/models/Diary';
import { formatChineseDate, formatDate } from '@/util/DateUtil';
import { motion } from 'motion/react';
import { marked } from 'marked';
import { useEffect, useState } from 'react';
import { Notebook as NotebookIcon } from '@ricons/carbon';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ScrollShadow,
} from '@heroui/react';

export default function DiaryCard({ diary }: { diary: Diary }) {
  const [md, setMd] = useState('');

  const [showDiary, setShowDiary] = useState(false);

  useEffect(() => {
    setMd(marked.parse(diary.content).toString());
  }, [diary]);

  return (
    <div className="scaleIn-container">
      <Modal
        size="5xl"
        backdrop="blur"
        isOpen={showDiary}
        onClose={() => {
          setShowDiary(false);
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {formatChineseDate(diary.createTime)} · 日记
          </ModalHeader>
          <ModalBody>
            <div>
              <ScrollShadow className="max-h-[75dvh]">
                <div className="prose md:prose-base dark:prose-invert max-w-full -mt-6">
                  <div dangerouslySetInnerHTML={{ __html: md }}></div>
                </div>
              </ScrollShadow>
              <div className="w-full h-0 border-t-1 border-dashed mb-3 -mt-1 border-default-300"></div>
              <div className="flex justify-between text-sm text-default-300 pb-1 select-none">
                <div>DIARY</div>
                <div>{formatDate(diary.createTime)}</div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/*日记卡片*/}
      <motion.div
        className="dark:dark:bg-[#1B1C20] bg-white transition-transform rounded-lg shadow-small w-[calc(100dvw-2rem)] md:w-40 xl:w-80 h-40 cursor-pointer overflow-hidden hover:-translate-y-0.5"
        onClick={() => setShowDiary(!showDiary)}
      >
        <div className="flex flex-col">
          {/*日期*/}
          <div className="text-xl px-4 py-2 text-foreground">
            <p>{formatChineseDate(diary.createTime)}</p>
          </div>
          <div className="w-full h-divider bg-divider"></div>
          <div className="prose dark:prose-invert px-4 h-full w-full line-clamp-3 -mt-3">
            <div dangerouslySetInnerHTML={{ __html: md }}></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
