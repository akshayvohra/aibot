import { Typography, Box, Stack, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import ChatHistoryCard from '../../ChatHistoryCard';
import ChatFilter from '../../ChatFilter';
import Navbar from '../../Navbar';

export default function History() {
    const [chats, setChats] = useState([]);
    const [filteredChats, setFilteredChats] = useState([]);

    useEffect(() => {
        try {
            const storedChats = localStorage.getItem('chat');
            if (storedChats) {
                const parsedChats = JSON.parse(storedChats);
                setChats(parsedChats);
                setFilteredChats(parsedChats);
            } else {
                setChats([]);
                setFilteredChats([]);
            }
        } catch (error) {
            console.error("Error loading chats:", error);
            setChats([]);
            setFilteredChats([]);
        }
    }, []);

    return (
        <Box
            height="100vh"
            sx={{
                overflowY: 'auto',
                '&::-webkit-scrollbar': { width: 8 },
                '&::-webkit-scrollbar-track': { backgroundColor: '#ddd' },
                '&::-webkit-scrollbar-thumb': { backgroundColor: '#aaa' },
            }}
        >
            <Navbar />

            <Box p={2}>
                <Typography variant="h2" align="center" marginBottom={3}>
                    Conversation History
                </Typography>

                {chats.length > 0 && <ChatFilter allChats={chats} filterChats={setFilteredChats} />}

                {chats.length === 0 && (
                    <Typography align="center" padding={2} bgcolor="primary.light" borderRadius={1}>
                        No saved chats.
                    </Typography>
                )}

                {chats.length > 0 && filteredChats.length === 0 && (
                    <Typography align="center" padding={2} bgcolor="primary.light" borderRadius={1}>
                        No such chats.
                    </Typography>
                )}

                {filteredChats.length > 0 ? (
                    <Stack spacing={3} divider={<Divider sx={{ borderColor: 'primary.bg' }} />}>
                        {filteredChats.map((chat, index) => (
                            <ChatHistoryCard details={chat} key={index} />
                        ))}
                    </Stack>
                ) : null}
            </Box>
        </Box>
    );
}
