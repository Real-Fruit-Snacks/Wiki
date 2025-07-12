---
title: "Variable Manager - Quick Configuration Examples"
tags: ["examples", "variables", "configuration", "quick-start"]
created: 2024-01-15
modified: 2024-01-15
---

# Variable Manager - Quick Configuration Examples

Simple, everyday examples of using the Variable Manager for quick configurations and common scenarios. Perfect for getting started!

## 🚀 Getting Started

**How to use this note:**
1. Click the **$** button in the header to open Variable Manager
2. Fill in the variable values in the side panel
3. Watch the code blocks update in real-time!
4. Use the 🔄 button to refresh variables, 🗑️ to reset values

## 🌐 Server Configuration

### Development Environment Setup
```yaml
# config/development.yml
server:
  host: $ServerHost
  port: $ServerPort
  environment: development
  debug: true

database:
  host: $DatabaseHost
  port: $DatabasePort
  name: $DatabaseName
  username: $DatabaseUser
  password: $DatabasePassword
  
redis:
  host: $RedisHost
  port: $RedisPort
  password: $RedisPassword
  
logging:
  level: $LogLevel
  file: logs/$ServiceName-dev.log
```

### Production Environment
```yaml
# config/production.yml
server:
  host: $ProductionHost
  port: $ProductionPort
  environment: production
  debug: false
  
database:
  host: $ProductionDatabaseHost
  port: $ProductionDatabasePort
  name: $ProductionDatabaseName
  username: $ProductionDatabaseUser
  password: $ProductionDatabasePassword
  ssl: true
  pool_size: $DatabasePoolSize
  
security:
  jwt_secret: $JwtSecret
  session_timeout: $SessionTimeout
  rate_limit: $RateLimit
```

## 📁 Quick Scripts

### Backup Script
```bash
#!/bin/bash
# Automated backup script

BACKUP_NAME="$BackupName-$(date +%Y%m%d_%H%M%S)"
SOURCE_DIR="$SourceDirectory"
BACKUP_DIR="$BackupDirectory"
RETENTION_DAYS=$RetentionDays

echo "Starting backup: $BACKUP_NAME"

# Create backup
tar -czf "$BACKUP_DIR/$BACKUP_NAME.tar.gz" "$SOURCE_DIR"

# Verify backup
if [ $? -eq 0 ]; then
    echo "✅ Backup completed successfully"
    echo "📁 Location: $BACKUP_DIR/$BACKUP_NAME.tar.gz"
    
    # Clean old backups
    find "$BACKUP_DIR" -name "*.tar.gz" -mtime +$RETENTION_DAYS -delete
    echo "🧹 Cleaned backups older than $RETENTION_DAYS days"
else
    echo "❌ Backup failed"
    exit 1
fi
```

### Git Workflow
```bash
# Quick git workflow for feature: $FeatureName

# Create and switch to feature branch
git checkout -b feature/$FeatureName

# Make your changes, then commit
git add .
git commit -m "$CommitType: $CommitMessage

- $ChangeDescription1
- $ChangeDescription2
- $ChangeDescription3"

# Push to remote
git push -u origin feature/$FeatureName

# Create pull request (GitHub CLI)
gh pr create \
  --title "$PullRequestTitle" \
  --body "$PullRequestDescription" \
  --assignee $GitHubUsername \
  --label $PullRequestLabel
```

## 🔐 Security Configurations

### SSL Certificate Setup
```nginx
# nginx SSL configuration for $DomainName
server {
    listen 80;
    server_name $DomainName www.$DomainName;
    return 301 https://$DomainName$request_uri;
}

server {
    listen 443 ssl http2;
    server_name $DomainName www.$DomainName;
    
    # SSL Configuration
    ssl_certificate /etc/ssl/certs/$DomainName.crt;
    ssl_certificate_key /etc/ssl/private/$DomainName.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers $SSLCiphers;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=$HSTSMaxAge; includeSubDomains" always;
    add_header X-Frame-Options $XFrameOptions;
    add_header X-Content-Type-Options nosniff;
    
    # Application
    location / {
        proxy_pass http://localhost:$AppPort;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Firewall Rules
```bash
#!/bin/bash
# Firewall configuration for $ServerName

# Reset rules
ufw --force reset

# Default policies
ufw default deny incoming
ufw default allow outgoing

# SSH (change default port for security)
ufw allow $SSHPort/tcp comment 'SSH'

# Web traffic
ufw allow $HTTPPort/tcp comment 'HTTP'
ufw allow $HTTPSPort/tcp comment 'HTTPS'

# Application specific
ufw allow from $TrustedIPRange to any port $AppPort comment '$ServiceName'

# Database (only from app server)
ufw allow from $AppServerIP to any port $DatabasePort comment 'Database'

# Monitoring
ufw allow from $MonitoringIP to any port $MonitoringPort comment 'Monitoring'

# Rate limiting for SSH
ufw limit $SSHPort/tcp

# Enable firewall
ufw --force enable

echo "Firewall configured for $ServerName"
ufw status verbose
```

## 📧 Email Templates

### Welcome Email
```html
<!DOCTYPE html>
<html>
<head>
    <title>Welcome to $CompanyName</title>
</head>
<body>
    <h1>Welcome to $CompanyName, $UserFirstName! 🎉</h1>
    
    <p>Thank you for joining $ServiceName. We're excited to have you aboard!</p>
    
    <h2>Getting Started</h2>
    <ul>
        <li>📚 Read our <a href="$DocsURL">Documentation</a></li>
        <li>🎯 Complete your <a href="$ProfileURL">Profile Setup</a></li>
        <li>💬 Join our <a href="$CommunityURL">Community</a></li>
    </ul>
    
    <h2>Your Account Details</h2>
    <ul>
        <li><strong>Username:</strong> $Username</li>
        <li><strong>Plan:</strong> $SubscriptionPlan</li>
        <li><strong>Login URL:</strong> <a href="$LoginURL">$LoginURL</a></li>
    </ul>
    
    <p>Need help? Contact us at <a href="mailto:$SupportEmail">$SupportEmail</a></p>
    
    <p>Best regards,<br>
    The $CompanyName Team</p>
</body>
</html>
```

### Meeting Invitation
```text
Subject: $MeetingSubject - $MeetingDate at $MeetingTime

Hi $AttendeeNames,

You're invited to join our $MeetingType meeting:

📅 Date: $MeetingDate
🕐 Time: $MeetingTime ($Timezone)
⏱️ Duration: $MeetingDuration
📍 Location: $MeetingLocation
🔗 Video Link: $VideoLink

AGENDA:
$MeetingAgenda

PREPARATION:
$PreparationNotes

Please confirm your attendance by replying to this email.

Best regards,
$OrganizerName
$OrganizerTitle
$OrganizerEmail
```

## 🏠 Personal Templates

### Shopping List Generator
```text
🛒 Shopping List for $StoreName - $ShoppingDate

🥬 PRODUCE
□ $Vegetable1 ($Quantity1)
□ $Vegetable2 ($Quantity2)
□ $Fruit1 ($Quantity3)
□ $Fruit2 ($Quantity4)

🥛 DAIRY
□ $DairyItem1 ($Quantity5)
□ $DairyItem2 ($Quantity6)

🍞 PANTRY
□ $PantryItem1 ($Quantity7)
□ $PantryItem2 ($Quantity8)

💰 Budget: $ShoppingBudget
📱 Store App: $StoreApp
🚗 Parking: $ParkingLocation

Notes: $ShoppingNotes
```

### Travel Checklist
```text
✈️ Travel Checklist for $TripDestination
📅 Departure: $DepartureDate at $DepartureTime
🏨 Hotel: $HotelName ($CheckInDate - $CheckOutDate)

DOCUMENTS ✅
□ Passport (expires: $PassportExpiry)
□ Flight tickets ($FlightNumber)
□ Hotel confirmation ($BookingReference)
□ Travel insurance ($PolicyNumber)
□ Driver's license
□ $AdditionalDocument1
□ $AdditionalDocument2

PACKING 🧳
□ Weather-appropriate clothes for $Weather
□ $TripDuration days of outfits
□ Chargers for devices
□ Toiletries
□ Medications
□ $SpecialItem1
□ $SpecialItem2

BEFORE LEAVING 🏠
□ Hold mail ($MailHoldDate)
□ Arrange pet care ($PetSitterName)
□ Set thermostat to $ThermostatSetting
□ Unplug electronics
□ Lock all doors and windows
□ $CustomTask1
□ $CustomTask2

EMERGENCY CONTACTS 📞
□ Embassy: $EmbassyPhone
□ Hotel: $HotelPhone
□ Emergency contact: $EmergencyContactName ($EmergencyContactPhone)
```

## 💡 Quick Tips

### Common Variable Patterns
- **Environment**: development, staging, production
- **Ports**: 3000, 8080, 5432, 6379
- **Timeouts**: 30s, 5m, 1h
- **Locations**: localhost, 127.0.0.1, company-server.com

### Pro Tips
1. **Start Simple**: Begin with basic configs, add complexity as needed
2. **Reuse Values**: Set common variables once, use everywhere
3. **Save Templates**: Copy successful variable setups for reuse
4. **Version Control**: Different variable values for dev/staging/prod

### Keyboard Shortcuts
- **Open Variable Manager**: `Ctrl+Shift+V`
- **Tab between inputs**: `Tab` key in Variable Manager
- **Quick save**: Variables auto-save as you type

## 🎯 Try These Example Values

**Server Config:**
- `ServerHost`: localhost, 0.0.0.0, myapp.com
- `ServerPort`: 3000, 8000, 8080
- `LogLevel`: debug, info, warn, error

**Security:**
- `SessionTimeout`: 30m, 1h, 24h
- `RateLimit`: 100, 1000, unlimited
- `SSHPort`: 22, 2222, 2200

**Personal:**
- `StoreName`: Walmart, Target, Whole Foods
- `TripDestination`: Paris, Tokyo, New York
- `Weather`: sunny, rainy, cold, hot 