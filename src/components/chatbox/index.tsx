import React, { useCallback, useRef, useState } from 'react';
import { CloseOutlined, MessageOutlined, SendOutlined } from '@ant-design/icons';
import './index.scss';
import { useGetResultMutation } from '@/apis/chatbox/chatbox.api';
import LoaderComponent from '../commons/loader';

const ChatBoxComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [getResult, { isLoading }] = useGetResultMutation();
  const [messages, setMessages] = useState<any>([]);
  const sendMessage = useCallback(
    async (message: string) => {
      try {
        const response = await getResult({
          request: {
            model: 'bytedance-research/ui-tars-72b:free',
            messages: [{ role: 'user', content: [{ type: 'text', text: `${message} (trả lời bằng tiếng việt)` }] }]
          }
        });
        const answer = response?.data?.choices[0]?.message?.content;
        setMessages((prev: any) => [
          ...prev,
          {
            ask: message,
            answer: answer
          }
        ]);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      } catch (error) {}
    },
    [messages]
  );
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputRef.current) {
      const message = inputRef.current.value.trim();
      if (message) {
        sendMessage(message);
      }
    }
  };
  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div className="shadow-xl flex max-h-[500px] min-h-[500px] w-[350px] flex-col justify-between rounded-xl border border-gray-300 bg-white">
          <div className="flex max-h-[450px] flex-1 flex-col">
            <div className="flex items-center justify-between rounded-t-xl bg-orange-500 p-3 text-white">
              <span className="font-semibold">Nhắn tin</span>
              <button onClick={() => setIsOpen(false)}>
                <CloseOutlined className="text-lg text-white" />
              </button>
            </div>
            <div className="relative flex flex-1 flex-col gap-2 overflow-auto p-3">
              <div className="max-w-[80%] self-start rounded-lg bg-gray-100 p-2">
                <span>Chúng tôi có thể giúp gì cho bạn?</span>
              </div>
              {messages.map((item: any) => {
                return (
                  <div className="message">
                    <div className="ask mt-[10px] flex justify-end">
                      <span className="block max-w-[80%] rounded-lg bg-orange-500 p-3 text-white">{item.ask}</span>
                    </div>
                    <div className="answer mt-[10px] flex justify-start">
                      <span className="block max-w-[80%] rounded-lg bg-gray-100 p-3">{item.answer}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative flex items-center overflow-hidden border-t p-2">
            <input
              onKeyDown={handleKeyDown}
              ref={inputRef}
              type="text"
              placeholder="Nhập tin nhắn vào đây..."
              className="w-full border-none p-2 outline-none"
            />
            <button
              onClick={() => {
                sendMessage(inputRef?.current?.value.trim() || '');
              }}
              className="relative p-2 text-orange-500"
            >
              <SendOutlined className="text-lg" />
              {isLoading && <LoaderComponent></LoaderComponent>}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="shadow-lg flex items-center justify-center rounded-full bg-orange-500 p-5"
        >
          <MessageOutlined className="text-lg text-white" />
        </button>
      )}
    </div>
  );
};

export default ChatBoxComponent;
