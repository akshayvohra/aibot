import { Box, Stack, Typography, Modal, IconButton, TextField, Button } from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

export default function FeedbackModal({ open, handleClose, chatId, updateChat }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        updateChat(prev => prev.map(item => 
            item.id === chatId ? { ...item, feedback: input } : item
        ));

        setInput('');
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box 
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90%',
                    maxWidth: 600,
                    bgcolor: 'background.paper',
                    p: 2,
                    borderRadius: 2
                }}
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <FeedbackIcon />
                        <Typography fontSize={16}>Provide Feedback</Typography>
                    </Stack>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Stack>

                <form onSubmit={handleSubmit}>
                    <TextField
                        multiline
                        rows={4}
                        fullWidth
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        required
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" type="submit" fullWidth>
                        Submit
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}
