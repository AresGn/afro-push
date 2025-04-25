@echo off
echo Creating AfroPush directory structure...

:: Create src directory if it doesn't exist
if not exist src mkdir src

:: Create main app structure
mkdir src\app
mkdir src\app\(auth)\login
mkdir src\app\(auth)\register\creator
mkdir src\app\(auth)\register\advertiser
mkdir src\app\(auth)\forgot-password

mkdir src\app\(dashboard)
mkdir src\app\(dashboard)\creator\profile
mkdir src\app\(dashboard)\creator\services
mkdir src\app\(dashboard)\creator\campaigns
mkdir src\app\(dashboard)\creator\analytics
mkdir src\app\(dashboard)\creator\earnings

mkdir src\app\(dashboard)\advertiser\profile
mkdir src\app\(dashboard)\advertiser\discover
mkdir src\app\(dashboard)\advertiser\campaigns
mkdir src\app\(dashboard)\advertiser\analytics

mkdir src\app\(dashboard)\messages
mkdir src\app\(dashboard)\messages\[conversationId]

mkdir src\app\(marketing)\about
mkdir src\app\(marketing)\pricing
mkdir src\app\(marketing)\creators
mkdir src\app\(marketing)\advertisers

mkdir src\app\api\auth\[...nextauth]
mkdir src\app\api\users
mkdir src\app\api\campaigns
mkdir src\app\api\services
mkdir src\app\api\messages
mkdir src\app\api\analytics
mkdir src\app\api\payments\webhook
mkdir src\app\api\payments\verify

:: Create components structure
mkdir src\components\ui
mkdir src\components\layout
mkdir src\components\forms
mkdir src\components\creators
mkdir src\components\advertisers
mkdir src\components\messaging
mkdir src\components\shared

:: Create other directories
mkdir src\hooks
mkdir src\lib
mkdir src\types
mkdir src\context
mkdir src\services
mkdir src\styles

:: Create placeholder files to ensure directory structure
echo // Button component > src\components\ui\Button.tsx
echo // Card component > src\components\ui\Card.tsx
echo // Input component > src\components\ui\Input.tsx
echo // Modal component > src\components\ui\Modal.tsx
echo // Select component > src\components\ui\Select.tsx
echo // Badge component > src\components\ui\Badge.tsx

echo // Header component > src\components\layout\Header.tsx
echo // Footer component > src\components\layout\Footer.tsx
echo // Sidebar component > src\components\layout\Sidebar.tsx
echo // Navigation component > src\components\layout\Navigation.tsx

echo // Main layout > src\app\layout.tsx
echo // Main page > src\app\page.tsx
echo // Dashboard layout > src\app\(dashboard)\layout.tsx
echo // Marketing layout > src\app\(marketing)\layout.tsx
echo // Marketing home page > src\app\(marketing)\page.tsx

echo // Authentication hook > src\hooks\useAuth.ts
echo // Database connection > src\lib\db.ts
echo // User types > src\types\user.ts
echo // Authentication context > src\context\AuthContext.tsx
echo // User service > src\services\userService.ts

echo @tailwind base; > src\styles\globals.css
echo @tailwind components; >> src\styles\globals.css
echo @tailwind utilities; >> src\styles\globals.css

echo Structure created successfully!