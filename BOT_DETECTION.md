# Bot Detection Implementation

This document describes the bot detection system implemented to prevent fake signups and spam submissions on whoisnnamdi.com.

## Overview

The bot detection system uses a multi-layered approach combining:
- Edge middleware for request filtering
- Client-side browser capability detection
- Server-side validation and pattern matching
- Challenge token generation

## Architecture

### 1. Middleware Layer (`middleware.js`)
- Runs on Vercel's Edge Runtime
- Analyzes request headers and user agents
- Flags suspicious requests before they reach the API
- Adds detection headers for downstream processing

**Key Features:**
- User agent pattern matching for common bots
- Origin and referer validation
- Request metadata analysis
- Non-blocking approach (flags rather than blocks)

### 2. Client-Side Detection (`components/botdetection.js`)
- Browser capability checks (Canvas, WebGL, LocalStorage)
- Headless browser detection
- Timing consistency analysis
- Challenge token generation using canvas fingerprinting

**Detection Methods:**
- Canvas rendering capabilities
- WebGL support
- Storage API availability
- JavaScript execution timing
- Touch interaction support

### 3. Server-Side Validation (`pages/api/subscribe.js`)
- Middleware header analysis
- Email pattern validation
- Source validation
- Challenge token verification
- Comprehensive logging of blocked attempts

**Validation Rules:**
- Suspicious user agents
- Invalid origins/referers
- Email patterns commonly used by bots
- Missing challenge tokens (production only)

## Implementation Details

### Bot Detection Patterns

#### User Agent Patterns
```javascript
const botPatterns = [
  /bot|crawler|spider|scraper/i,
  /curl|wget|python|java|go-http/i,
  /headless|phantom|selenium/i
]
```

#### Email Patterns
```javascript
const suspiciousEmailPatterns = [
  /^[a-z0-9]{10,}@gmail\.com$/i, // Random string Gmail accounts
  /^test.*@.*\.com$/i,           // Test emails
  /^.*\+.*@.*\.com$/i,          // Plus-addressing
  /^.*noreply.*@.*$/i,          // Noreply emails
]
```

### Client-Side Bot Scoring
The client-side detection uses a scoring system:
- Headless browser indicators: +1 point
- Timing inconsistencies: +1 point
- Bot user agents: +1 point
- No touch support: +1 point

Scores ≥2 are flagged as potential bots.

### Challenge Token
Generated using canvas fingerprinting:
1. Renders text to canvas
2. Extracts canvas data
3. Combines with timestamp and random value
4. Creates simple hash for verification

## Security Features

### Fail-Safe Design
- **Fail Open**: If detection fails, allow legitimate users through
- **Silent Blocking**: Return success responses to avoid tipping off bots
- **Comprehensive Logging**: All blocked attempts are logged with context

### Multi-Layer Protection
1. **Edge Middleware**: First line of defense
2. **Client Detection**: Browser-based validation
3. **Server Validation**: Final verification layer
4. **Pattern Matching**: Email and source validation

### Production Safeguards
- Challenge token requirement only in production
- Environment-specific detection rules
- Rate limiting preparation (middleware structure ready)

## Logging and Monitoring

All blocked attempts are logged with:
- Email address (if provided)
- User agent string
- IP address
- Detection method used
- Timestamp
- Request origin

Log format:
```javascript
{
  email: 'suspicious@example.com',
  userAgent: 'SuspiciousBot/1.0',
  origin: 'unknown',
  timestamp: '2024-01-01T12:00:00.000Z',
  ip: '192.168.1.1',
  detection: 'middleware-flagged'
}
```

## Configuration

### Environment Variables
```bash
# Required for challenge token validation in production
NODE_ENV=production

# Existing Mailchimp variables
MAILCHIMP_API_KEY=your_key
MAILCHIMP_API_SERVER=us1
MAILCHIMP_AUDIENCE_ID=your_audience_id
```

### Dependencies Added
```json
{
  "@vercel/edge": "^1.1.0"
}
```

## Future Enhancements

### Vercel BotID Integration
To upgrade to full Vercel BotID:
1. Install `@vercel/botid` package
2. Replace current detection with BotID API calls
3. Configure BotID settings in Vercel dashboard
4. Update middleware to use BotID responses

### Rate Limiting
The middleware is structured to support rate limiting:
- Use Vercel KV or Edge Config for request tracking
- Implement IP-based rate limits
- Add CAPTCHA challenges for suspicious traffic

### Analytics Integration
- Track bot detection metrics in existing analytics
- Monitor false positive rates
- Analyze bot attack patterns

## Testing

### Manual Testing
1. Test normal signup flow from browser
2. Test with disabled JavaScript
3. Test with suspicious user agents
4. Test with invalid email patterns

### Bot Simulation Testing
```bash
# Test with curl (should be blocked)
curl -X POST https://whoisnnamdi.com/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","merge":{"SOURCE":"Hero"}}'

# Test with suspicious user agent
curl -X POST https://whoisnnamdi.com/api/subscribe \
  -H "User-Agent: Bot/1.0" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","merge":{"SOURCE":"Hero"}}'
```

## Maintenance

### Regular Reviews
- Monitor blocked attempt logs
- Analyze false positive reports
- Update detection patterns as needed
- Review bot attack trends

### Performance Monitoring
- Edge middleware latency
- Client-side detection timing
- API response times
- False positive rates

The implementation provides robust bot protection while maintaining a smooth user experience for legitimate visitors.