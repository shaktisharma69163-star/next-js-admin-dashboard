"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import useProductStore from "../../store/productStore";

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();

  const { selectedProduct, fetchProductById } = useProductStore();

  useEffect(() => {
    fetchProductById(id);
  }, [id]);

  if (!selectedProduct) return <div>Loading...</div>;

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card>
        {selectedProduct.images?.map((img, index) => (
          <CardMedia
            key={index}
            component="img"
            height="200"
            image={img}
            sx={{ mb: 1 }}
          />
        ))}
        <CardContent>
          <Typography variant="h5">
            {selectedProduct.title}
          </Typography>
          <Typography>
            Price: ${selectedProduct.price}
          </Typography>
          <Typography>
            Rating: {selectedProduct.rating}
          </Typography>
          <Typography>
            {selectedProduct.description}
          </Typography>
        </CardContent>
      </Card>

      <Button sx={{ mt: 2 }} variant="contained" onClick={() => router.back()}>
        Back
      </Button>
    </Container>
  );
}