'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/modal';
import { Button } from '@heroui/button';
import { useState } from 'react';

/**
 * 提醒 Modal 弹窗
 * @param title 标题
 * @param content 内容
 * @param onClose 关闭事件*可选
 */
export default function AlertModal({
  title,
  content,
  onClose,
}: {
  title: string;
  content: string | React.ReactNode;
  onClose?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(true);

  function close() {
    setIsOpen(false);
    onClose?.();
  }

  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={() => close()}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <ModalBody>
          <p>{content}</p>
        </ModalBody>
        <ModalFooter>
          {/*<Button color="danger" variant="light" onPress={() => close()}>*/}
          {/*  关闭*/}
          {/*</Button>*/}
          <Button color="primary" onPress={() => close()}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
