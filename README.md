# Host Your Style
This project is using React, Next.js, Tailwind CSS, Clerk for authentication, and Postgres for the database. It consists of a homepage, an artist page, a style creation page, a style details page, and a gallery page.
Features

- Homepage: The homepage provides links to the artist and gallery pages.
- Artist page: This page, accessible only to authenticated users, lists the styles owned by the user.
- Style creation page: On this page, authenticated users can create a new style by setting its name, category, description, and uploading 10-20 images. The Replicate API is used to train a Dreambooth model, and the user receives an email when the training is complete.
- Style details page: This page displays information about a specific style and allows users to generate images using the trained Dreambooth model via the Replicate API.
- Gallery page: The gallery page showcases completed styles and enables users to search for entries by keyword or filter by category.
