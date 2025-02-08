import { Box, Typography, Stack, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function Card({ heading, subtext, handleClick }) {
    return (
        <Stack
            bgcolor="primary.light"
            p={2}
            borderRadius={1}
            boxShadow={1}
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
            sx={{
                cursor: 'pointer',
                '&:hover': { bgcolor: 'primary.bglight' }
            }}
            onClick={() => handleClick(heading)}
        >
            <Box>
                <Typography fontWeight="bold" fontSize={16}>
                    {heading}
                </Typography>
                <Typography fontSize={12} color="text.secondary">
                    {subtext}
                </Typography>
            </Box>
            <IconButton size="small">
                <ArrowUpwardIcon fontSize="small" />
            </IconButton>
        </Stack>
    );
}
