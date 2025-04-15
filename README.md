# Image Search Abstraction Layer

## Description

This project is an image search tool that allows searching for images using a specific term. The system retrieves images through a backend that connects to an external endpoint to fetch the results. The images are displayed along with the URL of the image itself and the URL of the original page where the image is hosted.

It features a **pagination** system that allows loading different images interactively. Additionally, the backend validates inputs to ensure that searches are not empty and do not contain invalid terms.

## Features

- Search for images using specific terms.
- Display images along with their original URL and the reference page URL.
- Pagination to load more images efficiently.
- Input validation to avoid empty searches or invalid terms.
- Backend that connects to an image endpoint and handles requests from the frontend.
