# Multi-Step Board Creation API

## Overview

The board creation API has been enhanced to support multi-step board creation while maintaining backward compatibility with the existing simple board creation flow.

## API Endpoint

`POST /api/boards`

## Request Detection

The API automatically detects whether a request is for multi-step board creation based on the presence of specific fields:

- `boardType`
- `nameType`
- `postingMode`
- `moderationEnabled`
- `allowAnonymous`
- `boardVisibility`
- `typeConfig`

If any of these fields are present, the request is processed as a multi-step board creation.

## Request Schemas

### Legacy Board Creation (Backward Compatible)

```json
{
  "title": "Simple Board",
  "recipientName": "John Doe"
}
```

### Multi-Step Board Creation

```json
{
  "title": "Appreciation Board for John",
  "recipientName": "John Doe",
  "boardType": "appreciation",
  "nameType": "full-name",
  "postingMode": "multiple",
  "moderationEnabled": false,
  "allowAnonymous": true,
  "maxPostsPerUser": "5",
  "boardVisibility": "public",
  "expirationDate": "2024-12-31T23:59:59.000Z",
  "typeConfig": {
    "appreciationTheme": "professional",
    "showContributorNames": true
  }
}
```

## Field Validation

### Required Fields (Multi-Step)

- `title`: String (1-255 characters, trimmed)
- `recipientName`: String (1-255 characters, trimmed)
- `boardType`: Enum (appreciation, birthday, farewell, welcome, congratulations, get-well, sympathy, holiday, anniversary, retirement, graduation, baby-shower, wedding, general)
- `nameType`: Enum (first-name, full-name, nickname)
- `postingMode`: Enum (single, multiple)

### Optional Fields (Multi-Step)

- `moderationEnabled`: Boolean (default: false)
- `allowAnonymous`: Boolean (default: true)
- `maxPostsPerUser`: String (numeric, 1-100, null for unlimited)
- `boardVisibility`: Enum (public, private, default: public)
- `expirationDate`: ISO datetime string (must be future date)
- `typeConfig`: Object (type-specific configuration)

## Business Rules

1. **Single Posting Mode**: When `postingMode` is "single", `maxPostsPerUser` cannot be greater than 1
2. **Expiration Date**: Must be in the future if provided
3. **Type Configuration**: Must be valid for the specified board type

## Response Format

### Success Response (201)

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Board Title",
    "recipientName": "Recipient Name",
    "creatorId": "user-id",
    "viewToken": "view-token",
    "postToken": "post-token",
    "boardType": "appreciation",
    "nameType": "full-name",
    "postingMode": "multiple",
    "moderationEnabled": false,
    "allowAnonymous": true,
    "maxPostsPerUser": "5",
    "boardVisibility": "public",
    "expirationDate": "2024-12-31T23:59:59.000Z",
    "typeConfig": {...},
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Board created successfully"
}
```

### Validation Error Response (400)

```json
{
  "success": false,
  "error": "Invalid board data",
  "details": [
    {
      "field": "boardType",
      "message": "Please select a valid board type",
      "code": "invalid_enum_value"
    }
  ]
}
```

### Server Error Response (500)

```json
{
  "success": false,
  "error": "Failed to create board"
}
```

## Type-Specific Configuration

### Appreciation Boards

```json
{
  "appreciationTheme": "professional|casual|celebration",
  "showContributorNames": true|false
}
```

### Birthday Boards

```json
{
  "birthdayDate": "1990-05-15",
  "ageDisplay": "show|hide|milestone-only"
}
```

### Farewell Boards

```json
{
  "farewellType": "retirement|job-change|relocation|other",
  "lastWorkingDay": "2024-12-31"
}
```

### General Configuration (All Types)

```json
{
  "customMessage": "Custom message text",
  "backgroundColor": "#FF5733"
}
```

## Database Schema

The boards table has been extended with the following columns:

- `board_type`: varchar(50) DEFAULT 'general'
- `name_type`: varchar(50) DEFAULT 'full-name'
- `posting_mode`: varchar(50) DEFAULT 'multiple'
- `moderation_enabled`: boolean DEFAULT false
- `allow_anonymous`: boolean DEFAULT true
- `max_posts_per_user`: varchar(10) (nullable)
- `board_visibility`: varchar(50) DEFAULT 'public'
- `expiration_date`: timestamp (nullable)
- `type_config`: json (nullable)

## Backward Compatibility

Legacy board creation requests (containing only `title` and `recipientName`) are automatically handled with default values:

- `boardType`: "general"
- `nameType`: "full-name"
- `postingMode`: "multiple"
- `moderationEnabled`: false
- `allowAnonymous`: true
- `boardVisibility`: "public"
- All other fields: null

## Error Handling

The API provides comprehensive error handling for:

1. **Validation Errors**: Detailed field-level validation messages
2. **Business Rule Violations**: Cross-field validation errors
3. **Database Errors**: Graceful handling of database constraints
4. **Server Errors**: Generic error responses with development details

## Testing

The implementation includes comprehensive test coverage:

- Validation schema tests
- Business logic validation tests
- API endpoint integration tests
- Error handling tests
- Backward compatibility tests
