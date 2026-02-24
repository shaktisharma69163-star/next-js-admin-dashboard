"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import Link from "next/link";
import useProductStore from "../store/productStore";

export default function Products() {
  const {
    products,
    fetchProducts,
    categories,
    fetchCategories,
    skip,
  } = useProductStore();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchProducts(0);
    fetchCategories();
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      <TextField
        label="Search Products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mr: 2, mb: 2 }}
      />

      <Button variant="contained" onClick={() => fetchProducts(0, search)}>
        Search
      </Button>

      <Select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          fetchProducts(0, "", e.target.value);
        }}
        sx={{ ml: 2 }}
      >
        <MenuItem value="">All</MenuItem>
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </Select>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Link href={`/products/${product.id}`} style={{ textDecoration: "none" }}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.thumbnail}
                />
                <CardContent>
                  <Typography variant="h6">
                    {product.title}
                  </Typography>
                  <Typography>
                    Price: ${product.price}
                  </Typography>
                  <Typography>
                    Rating: {product.rating}
                  </Typography>
                  <Typography>
                    Category: {product.category}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      <Button sx={{ mt: 3, mr: 2 }} onClick={() => fetchProducts(skip - 10)} disabled={skip === 0}>
        Prev
      </Button>

      <Button sx={{ mt: 3 }} onClick={() => fetchProducts(skip + 10)}>
        Next
      </Button>
    </Container>
  );
}