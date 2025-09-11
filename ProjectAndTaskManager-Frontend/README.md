# Project and Task Manager - Frontend

A modern React + TypeScript + Vite application for managing projects and tasks with a beautiful and responsive UI.

## Features

- **React 19** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for modern styling
- **React Router** for client-side routing
- **React Query** for efficient data fetching
- **React Hook Form** with Zod validation
- **Chakra UI** components for enhanced UX
- **Docker** ready for production deployment

## Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# Create .env file
VITE_API_URL=http://localhost:3000/api
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Docker Deployment

### Building the Docker Image

The application includes a production-ready multi-stage Dockerfile optimized for deployment to Docker Hub and AWS ECS.

#### Build with environment variables:
```bash
docker build --build-arg VITE_API_URL=https://your-api-url.com/api -t your-username/project-task-manager-frontend:latest .
```

#### Build for different environments:
```bash
# Development
docker build --build-arg VITE_API_URL=http://localhost:3000/api -t project-task-manager-frontend:dev .

# Production
docker build --build-arg VITE_API_URL=https://api.yourdomain.com/api -t project-task-manager-frontend:prod .
```

### Running the Container

```bash
# Run locally
docker run -p 80:80 your-username/project-task-manager-frontend:latest

# Run with custom port
docker run -p 8080:80 your-username/project-task-manager-frontend:latest
```

### Docker Hub Deployment

1. **Login to Docker Hub:**
```bash
docker login
```

2. **Tag your image:**
```bash
docker tag your-username/project-task-manager-frontend:latest your-username/project-task-manager-frontend:v1.0.0
```

3. **Push to Docker Hub:**
```bash
docker push your-username/project-task-manager-frontend:latest
docker push your-username/project-task-manager-frontend:v1.0.0
```

### AWS ECS Deployment

#### 1. Create ECS Task Definition

Create a `task-definition.json`:

```json
{
  "family": "project-task-manager-frontend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::YOUR_ACCOUNT:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "frontend",
      "image": "your-username/project-task-manager-frontend:latest",
      "portMappings": [
        {
          "containerPort": 80,
          "protocol": "tcp"
        }
      ],
      "essential": true,
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/project-task-manager-frontend",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -f http://localhost/health || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 60
      }
    }
  ]
}
```

#### 2. Deploy using AWS CLI

```bash
# Register task definition
aws ecs register-task-definition --cli-input-json file://task-definition.json

# Create or update service
aws ecs create-service \
  --cluster your-cluster-name \
  --service-name project-task-manager-frontend \
  --task-definition project-task-manager-frontend \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-12345,subnet-67890],securityGroups=[sg-12345],assignPublicIp=ENABLED}"
```

#### 3. Using AWS Console

1. Go to ECS Console
2. Create a new service
3. Select Fargate launch type
4. Use your Docker Hub image: `your-username/project-task-manager-frontend:latest`
5. Configure networking and load balancer
6. Set up health checks

### Environment Variables

The application requires the following environment variable:

- `VITE_API_URL`: Backend API URL (e.g., `https://api.yourdomain.com/api`)

### Health Checks

The application includes a health check endpoint at `/health` that returns a 200 status when the application is running correctly.

### Security Features

- Non-root user execution
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- Gzip compression
- Static asset caching
- Client-side routing support

### Performance Optimizations

- Multi-stage Docker build for smaller image size
- Nginx for serving static files
- Gzip compression enabled
- Static asset caching (1 year)
- Optimized build process with npm ci

## Development Tools

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
