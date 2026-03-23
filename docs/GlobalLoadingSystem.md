# Global Loading System Documentation

## Overview

This document describes the global loading spinner system implemented across the Pristine-web application. The system provides a centralized loading state management with automatic integration for routing and API calls.

## Architecture

### Components

1. **LoadingContext** (`src/context/LoadingContext.tsx`)
   - Provides global loading state management
   - Exposes loading controls via React Context API
   - Listens for custom events from API interceptors

2. **GlobalLoader** (`src/components/GlobalLoader/index.tsx`)
   - Renders the loading overlay with Lottie animation
   - Uses the Soft UI loader animation from `src/asset/image/Soft ui loader (1).json`
   - Displays with semi-transparent backdrop and centered content

3. **RouteLoader** (`src/components/RouteLoader/index.tsx`)
   - Automatically shows loading during route navigation
   - Wraps the main routing component
   - Displays for 500ms during navigation

4. **useApiLoader Hook** (`src/hooks/useApiLoader.ts`)
   - Provides easy integration for manual API calls
   - Wraps async functions with loading states
   - Automatically shows/hides loader

### API Integration

The `apiClient` in `src/api/apiClient.ts` includes:
- Request interceptor: Shows loader when API calls start
- Response interceptor: Hides loader when API calls complete
- Error interceptor: Ensures loader is hidden on errors
- Tracks multiple concurrent requests

## Usage

### Manual Loading Control

```typescript
import { useLoading } from '../context/LoadingContext';

const MyComponent = () => {
  const { showLoader, hideLoader } = useLoading();

  const handleOperation = async () => {
    showLoader('Processing data...');
    try {
      await someAsyncOperation();
    } finally {
      hideLoader();
    }
  };

  return <button onClick={handleOperation}>Process</button>;
};
```

### API Call Integration

```typescript
import { useApiLoader } from '../hooks/useApiLoader';
import apiClient from '../api/apiClient';

const MyComponent = () => {
  const { withLoader } = useApiLoader();

  const fetchData = async () => {
    try {
      const result = await withLoader(
        () => apiClient.get('/api/data'),
        'Fetching data...'
      );
      console.log(result);
    } catch (error) {
      console.error('Failed to fetch data');
    }
  };

  return <button onClick={fetchData}>Load Data</button>;
};
```

### Automatic API Loading

All requests made through the `apiClient` instance automatically trigger the global loader:

```typescript
import apiClient from '../api/apiClient';

// This will automatically show the loader
const response = await apiClient.get('/api/users');
```

## Features

### Visual Design
- **Animation**: Soft UI Lottie animation (24x24 size)
- **Overlay**: Semi-transparent black backdrop (50% opacity)
- **Container**: White rounded container with shadow
- **Message**: Dynamic loading message display
- **Z-index**: 9999 (highest priority)

### Automatic Triggers
1. **Route Navigation**: Shows during page transitions
2. **API Requests**: Shows during HTTP requests via apiClient
3. **Manual Control**: Available via useLoading hook

### Performance Considerations
- Tracks concurrent requests to prevent flickering
- Uses event system for cross-component communication
- Automatic cleanup on component unmount
- Minimal re-renders with React Context optimization

## Integration Points

### App.tsx Setup
```typescript
<QueryClientProvider client={queryClient}>
  <AuthProvider>
    <LoadingProvider>
      <ConfigProvider theme={theme}>
        <AntdApp>
          <GlobalStyles />
          <Router>
            <MainLayout />
          </Router>
          <GlobalLoader />
          <ReactQueryDevtools initialIsOpen={false} />
        </AntdApp>
      </ConfigProvider>
    </LoadingProvider>
  </AuthProvider>
</QueryClientProvider>
```

### Route Integration
```typescript
function AppRoutes() {
  const element = useRoutes(routes);
  return <RouteLoader>{element}</RouteLoader>;
}
```

## Customization

### Loading Messages
- Default: "Loading..."
- Customizable via `showLoader('Custom message...')`
- API calls use "Making request..."
- Navigation uses "Loading page..."

### Animation Customization
Replace the Lottie animation in `GlobalLoader/index.tsx`:
```typescript
import customAnimation from '../path/to/custom-animation.json';

<Lottie 
  animationData={customAnimation}
  loop={true}
  autoplay={true}
/>
```

### Styling Customization
Modify styles in `GlobalLoader/index.tsx`:
- Container: Update Tailwind classes
- Backdrop: Adjust opacity and color
- Size: Change w-24 h-24 for different dimensions

## Testing

A demo component is available at `src/components/LoadingDemo/index.tsx` and integrated into the Dashboard to test:
- Manual loader control
- API call integration
- Different loading messages

## Troubleshooting

### Loader Not Showing
1. Ensure LoadingProvider wraps the application
2. Check that GlobalLoader component is rendered
3. Verify API calls use the apiClient instance

### Loader Not Hiding
1. Check for unmatched showLoader/hideLoader calls
2. Ensure API interceptors are properly configured
3. Verify event listeners are cleaned up

### Performance Issues
1. Monitor for excessive re-renders
2. Check concurrent request tracking
3. Verify cleanup on component unmount

## Future Enhancements

1. **Progress Indicators**: Add progress bars for long-running operations
2. **Queue Management**: Queue multiple loading messages
3. **Timeout Handling**: Auto-hide loader after timeout
4. **Accessibility**: Add ARIA labels and screen reader support
5. **Animation Variants**: Support multiple loader animations
