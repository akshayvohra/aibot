import { Box, Stack, Typography } from '@mui/material';
import InitialChat from '../../InitialChat';
import ChatInput from '../../ChatInput';
import ChattingCard from '../../ChattingCard';
import FeedbackModal from '../../FeedbackModal';
import { useEffect, useRef, useState, useContext } from 'react';
import data from '../../aiData/sampleData.json';
import { useOutletContext } from 'react-router-dom';
import Navbar from '../../Navbar';
import { ThemeContext } from '../../theme/ThemeContext';

export default function Home() {
    const [showModal, setShowModal] = useState(false);
    const chatContainerRef = useRef(null);
    const [chatId, setChatId] = useState(1);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [triggerScroll, setTriggerScroll] = useState(false);
    const { chat, setChat } = useOutletContext();
    const { mode } = useContext(ThemeContext);

    // Generating AI Response
    const generateResponse = (userInput) => {
        const foundResponse = data.find(item => userInput.toLowerCase() === item.question.toLowerCase());
        const reply = foundResponse ? foundResponse.response : "Sorry, I did not understand your query!";

        setChat(prevChat => ([
            ...prevChat,
            { type: 'Human', text: userInput, time: new Date(), id: chatId },
            { type: 'AI', text: reply, time: new Date(), id: chatId + 1 }
        ]));

        setChatId(prevId => prevId + 2);
    };

    // Auto-scroll to latest message
    useEffect(() => {
        chatContainerRef.current?.lastElementChild?.scrollIntoView();
    }, [triggerScroll]);

    return (
        <Stack
            height="100vh"
            justifyContent="space-between"
            sx={{
                '@media (max-width:767px)': {
                    background: mode === 'light' ? 'linear-gradient(#F9FAFA 60%, #EDE4FF)' : ''
                }
            }}
        >
            <Navbar />

            {chat.length === 0 ? (
                <InitialChat generateResponse={generateResponse} />
            ) : (
                <Stack
                    height={1}
                    flexGrow={0}
                    p={{ xs: 2, md: 3 }}
                    spacing={{ xs: 2, md: 3 }}
                    sx={{
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': { width: 10 },
                        '&::-webkit-scrollbar-track': {
                            boxShadow: 'inset 0 0 8px rgba(0,0,0,0.1)',
                            borderRadius: 8
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(151, 133, 186,0.4)',
                            borderRadius: 8
                        }
                    }}
                    ref={chatContainerRef}
                >
                    {chat.map((message, idx) => (
                        <ChattingCard
                            key={idx}
                            details={message}
                            updateChat={setChat}
                            setSelectedChatId={setSelectedChatId}
                            showFeedbackModal={() => setShowModal(true)}
                        />
                    ))}
                </Stack>
            )}

            <ChatInput
                generateResponse={generateResponse}
                setScroll={setTriggerScroll}
                chat={chat}
                clearChat={() => setChat([])}
            />

            <FeedbackModal
                open={showModal}
                updateChat={setChat}
                chatId={selectedChatId}
                handleClose={() => setShowModal(false)}
            />
        </Stack>
    );
}
