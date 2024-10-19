import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export function Prayer({ name, time, image, isNextPrayer }) {

  return (
    <Card sx={{
      width: "100%",
      height: "100%",
      border: isNextPrayer ? "2px solid #ff7043" : "none",
      boxShadow: isNextPrayer ? "0 0 10px rgba(255, 112, 67, 0.5)" : "none",
      transform: isNextPrayer ? "scale(1.05)" : "scale(1)",
      transition: "transform 0.3s ease-in-out",
      ...(isNextPrayer ? {} : {
        '&:hover': {
          transform: "scale(1.09)",
          zIndex: 5,
        },
      })
    }}>
      <CardMedia
        component="img"
        sx={{ height: "40%", width: "100%", objectFit: "cover" }}
        image={image}
        alt={name}
      />
      <CardContent>
        {
          isNextPrayer && (
            <Typography variant="h5" color="text.secondary">
              Next Prayer
            </Typography>
          )
        }
        <Typography variant="h2" component="div">
          {name}
        </Typography>
        <Typography variant="h1" color="text.secondary">
          {time}
        </Typography>
      </CardContent>
    </Card >

  );
}