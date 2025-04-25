import { ChatRequestOptions, Message } from 'ai';
import { LoadingMessage, PreviewMessage, ThinkingMessage } from './message';
import { useScrollToBottom } from './use-scroll-to-bottom';
import { memo, useState, useRef } from 'react';
import { Vote } from '@/lib/db/schema';
import equal from 'fast-deep-equal';
import { useQueryLoadingSelector } from '@/hooks/use-query-loading';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GitIcon, BoxIcon } from '@/components/icons';
import { PencilEditIcon, SparklesIcon } from './icons';

interface MessagesProps {
  chatId: string;
  isLoading: boolean;
  votes: Array<Vote> | undefined;
  messages: Array<Message>;
  setMessages: (
    messages: Message[] | ((messages: Message[]) => Message[]),
  ) => void;
  reload: (
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
  isReadonly: boolean;
  isBlockVisible: boolean;
}

export const Messages = memo(
  ({
    chatId,
    messages,
    setMessages,
    isLoading,
    votes,
    reload,
    isReadonly,
    isBlockVisible,
  }: MessagesProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    useScrollToBottom(scrollRef, messages);
    const loadingMessages = useQueryLoadingSelector((state) => state.messages);

    return (
      <div
        ref={scrollRef}
        className={cn('flex-1 py-4 overflow-y-auto', {
          'pr-4': !isBlockVisible,
        })}
      >
        {!isLoading && messages.length === 0 && (
          <div className="flex-1 flex items-center justify-center p-4 md:p-8">
            <motion.div
              className="max-w-md mx-auto text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-4">
                <motion.div
                  animate={{
                    y: [-2, 2, -2],
                    rotate: [-1, 1, -1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-thron/20 to-thron/30 
                      blur-2xl rounded-full -z-10"
                  />
                  <div className="w-12 h-12 mx-auto text-thron drop-shadow-[0_0_15px_rgba(44,170,222,0.3)]">
                    <BoxIcon size={48} />
                  </div>
                </motion.div>

                <div className="space-y-2">
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-base md:text-2xl font-semibold bg-clip-text text-transparent 
                      bg-gradient-to-r from-thron via-thron/90 to-thron/80"
                  >
                    Thron AI assistant
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xs md:text-base text-muted-foreground/80 max-w-[340px] mx-auto leading-relaxed"
                  >
                    A Finance and trading research assistant for deep understanding and trading capabilities. Ask any question for financial research, stock analysis, and more.
                    
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="pt-2"
                  >
                    <a
                      href="https://github.com/Thron-Labs/thronfinance"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-2 py-1 md:px-6 md:py-2.5 text-xs md:text-sm font-medium 
                        bg-gradient-to-r from-thron/10 to-thron/5 hover:from-thron/15 hover:to-thron/10
                        text-thron hover:text-thron/90 rounded-full transition-all duration-300
                        shadow-[0_0_0_1px_rgba(44,170,222,0.1)] hover:shadow-[0_0_0_1px_rgba(44,170,222,0.2)]
                        hover:scale-[1.02]"
                    >
                      <GitIcon className="w-4 h-4 mr-1" />
                      View source code
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {messages.map((message, index) => (
          <PreviewMessage
            key={message.id}
            chatId={chatId}
            message={message}
            vote={votes?.find((vote) => vote.messageId === message.id)}
            isLoading={isLoading}
            setMessages={setMessages}
            reload={reload}
            isReadonly={isReadonly}
          />
        ))}

        {isLoading && messages.length > 0 && <ThinkingMessage />}
        {isLoading && loadingMessages && loadingMessages.length > 0 && (
          <LoadingMessage loadingMessages={loadingMessages} />
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      equal(prevProps.messages, nextProps.messages) &&
      prevProps.isLoading === nextProps.isLoading &&
      equal(prevProps.votes, nextProps.votes) &&
      prevProps.isReadonly === nextProps.isReadonly &&
      prevProps.isBlockVisible === nextProps.isBlockVisible
    );
  },
);

Messages.displayName = 'Messages';
