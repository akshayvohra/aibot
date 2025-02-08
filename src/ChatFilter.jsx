import { Box, Select, MenuItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ChatFilter({ allChats, filterChats }) {
    const [selectedRating, setSelectedRating] = useState('All Ratings');

    useEffect(() => {
        if (selectedRating === 'All Ratings') {
            filterChats(allChats);
        } else {
            filterChats(allChats.filter(chat => 
                chat.chat.some(message => message.rating === selectedRating)
            ));
        }
    }, [selectedRating]);

    return (
        <Box mb={2}>
            <Typography fontSize={12} mb={1}>
                Filter by rating
            </Typography>
            <Select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                size="small"
                sx={{ minWidth: 150 }}
            >
                <MenuItem value="All Ratings">All Ratings</MenuItem>
                <MenuItem value={1}>1 Star</MenuItem>
                <MenuItem value={2}>2 Stars</MenuItem>
                <MenuItem value={3}>3 Stars</MenuItem>
                <MenuItem value={4}>4 Stars</MenuItem>
                <MenuItem value={5}>5 Stars</MenuItem>
            </Select>
        </Box>
    );
}
