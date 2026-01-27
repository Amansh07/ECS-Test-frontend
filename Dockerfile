# Stage 1: Build the React application
FROM node:22.21.1-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
# Copy build output to Nginx's html folder
COPY --from=build /app/build /usr/share/nginx/html
# (Optional) Copy custom nginx config if you use React Router
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]