---
title: "Variable Manager - Documentation Templates"
tags: ["examples", "variables", "documentation", "templates"]
created: 2024-01-15
modified: 2024-01-15
---

# Variable Manager - Documentation Templates

This note demonstrates how to use variables for creating reusable documentation templates. Perfect for standardizing project documentation across teams.

## 📋 Project README Template

### Basic Project Information
```markdown
# $ProjectName

$ProjectDescription

## 🚀 Quick Start

### Prerequisites
- $RuntimeEnvironment $RuntimeVersion or higher
- $PackageManager $PackageManagerVersion or higher
- $DatabaseSystem $DatabaseVersion (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/$GitHubOrg/$ProjectName.git
   cd $ProjectName
   ```

2. Install dependencies:
   ```bash
   $PackageManager install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start the application:
   ```bash
   $PackageManager run dev
   ```

The application will be available at http://localhost:$DevPort

## 📖 Documentation

- [API Documentation]($DocsUrl/api)
- [User Guide]($DocsUrl/user-guide)
- [Contributing Guidelines](CONTRIBUTING.md)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the $License License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Project Lead**: $ProjectLead ($ProjectLeadEmail)
- **Tech Lead**: $TechLead ($TechLeadEmail)
- **Product Owner**: $ProductOwner ($ProductOwnerEmail)
```

## 🔧 API Documentation Template

### Endpoint Documentation
```markdown
## API Endpoint: $EndpointName

### Overview
$EndpointDescription

### HTTP Method
`$HttpMethod`

### URL
```
$BaseUrl/$ApiVersion/$EndpointPath
```

### Authentication
$AuthenticationType required. Include the following header:
```
Authorization: $AuthenticationScheme $TokenPlaceholder
```

### Request Parameters

#### Path Parameters
- `$PathParam1` (string, required): $PathParam1Description
- `$PathParam2` (string, optional): $PathParam2Description

#### Query Parameters
- `$QueryParam1` (string, optional): $QueryParam1Description
- `$QueryParam2` (integer, optional): $QueryParam2Description
  - Default: $QueryParam2Default
  - Range: $QueryParam2Range

#### Request Body
```json
{
  "$RequestField1": "$RequestField1Type",
  "$RequestField2": "$RequestField2Type",
  "$RequestField3": {
    "$NestedField1": "$NestedField1Type",
    "$NestedField2": "$NestedField2Type"
  }
}
```

### Response

#### Success Response ($SuccessStatusCode)
```json
{
  "success": true,
  "data": {
    "$ResponseField1": "$ResponseField1Type",
    "$ResponseField2": "$ResponseField2Type",
    "$ResponseField3": [$ResponseField3Type]
  },
  "message": "$SuccessMessage"
}
```

#### Error Responses

**$ErrorStatusCode1 - $ErrorStatusCode1Name**
```json
{
  "success": false,
  "error": {
    "code": "$ErrorCode1",
    "message": "$ErrorMessage1"
  }
}
```

### Example Usage

#### cURL
```bash
curl -X $HttpMethod \
  "$BaseUrl/$ApiVersion/$EndpointPath" \
  -H "Authorization: $AuthenticationScheme $ExampleToken" \
  -H "Content-Type: application/json" \
  -d '{
    "$RequestField1": "$ExampleValue1",
    "$RequestField2": "$ExampleValue2"
  }'
```

#### JavaScript (fetch)
```javascript
const response = await fetch('$BaseUrl/$ApiVersion/$EndpointPath', {
  method: '$HttpMethod',
  headers: {
    'Authorization': '$AuthenticationScheme $ExampleToken',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    $RequestField1: '$ExampleValue1',
    $RequestField2: '$ExampleValue2'
  })
});

const data = await response.json();
console.log(data);
```

#### Python (requests)
```python
import requests

url = "$BaseUrl/$ApiVersion/$EndpointPath"
headers = {
    "Authorization": "$AuthenticationScheme $ExampleToken",
    "Content-Type": "application/json"
}
data = {
    "$RequestField1": "$ExampleValue1",
    "$RequestField2": "$ExampleValue2"
}

response = requests.$HttpMethodLower(url, headers=headers, json=data)
result = response.json()
print(result)
```
```

## 🐛 Bug Report Template

### Issue Report
```markdown
# Bug Report: $BugTitle

## 📝 Description
$BugDescription

## 🔄 Steps to Reproduce
1. $Step1
2. $Step2
3. $Step3
4. $Step4

## ✅ Expected Behavior
$ExpectedBehavior

## ❌ Actual Behavior
$ActualBehavior

## 🌍 Environment
- **OS**: $OperatingSystem $OSVersion
- **Browser**: $BrowserName $BrowserVersion
- **Application Version**: $AppVersion
- **Environment**: $Environment

## 📸 Screenshots
$ScreenshotDescription

## 📋 Additional Context
$AdditionalContext

## 🏷️ Labels
- Priority: $Priority
- Component: $Component
- Type: $IssueType

## 👤 Reporter
- **Name**: $ReporterName
- **Email**: $ReporterEmail
- **Date**: $ReportDate
```

## 📊 Meeting Notes Template

### Team Meeting Minutes
```markdown
# $MeetingType Meeting - $MeetingDate

## 📋 Meeting Details
- **Date**: $MeetingDate
- **Time**: $MeetingStartTime - $MeetingEndTime ($Timezone)
- **Location**: $MeetingLocation
- **Facilitator**: $MeetingFacilitator

## 👥 Attendees
- $Attendee1 ($Attendee1Role)
- $Attendee2 ($Attendee2Role)
- $Attendee3 ($Attendee3Role)
- $Attendee4 ($Attendee4Role)

## 🎯 Agenda
1. $AgendaItem1
2. $AgendaItem2
3. $AgendaItem3
4. $AgendaItem4

## 💬 Discussion Points

### $DiscussionTopic1
$DiscussionTopic1Notes

**Decision**: $Decision1
**Owner**: $Decision1Owner
**Due Date**: $Decision1DueDate

### $DiscussionTopic2
$DiscussionTopic2Notes

**Decision**: $Decision2
**Owner**: $Decision2Owner
**Due Date**: $Decision2DueDate

## ✅ Action Items
1. **$ActionItem1** - Owner: $ActionItem1Owner, Due: $ActionItem1Due
2. **$ActionItem2** - Owner: $ActionItem2Owner, Due: $ActionItem2Due
3. **$ActionItem3** - Owner: $ActionItem3Owner, Due: $ActionItem3Due

## 📅 Next Meeting
- **Date**: $NextMeetingDate
- **Time**: $NextMeetingTime
- **Agenda Preview**: $NextMeetingAgenda
```

## 💡 Template Usage Tips

1. **Save as Templates**: Create these notes and reuse them for new projects
2. **Variable Presets**: Set common variable values and save time
3. **Team Consistency**: Share variable templates across your team
4. **Quick Generation**: Use variables to rapidly generate documentation

## 🎯 Common Variable Examples

**Project Variables:**
- `ProjectName`: My Awesome App, API Gateway, Mobile App
- `ProjectDescription`: A modern web application for...
- `License`: MIT, Apache 2.0, GPL-3.0

**Team Variables:**
- `ProjectLead`: John Smith, Sarah Wilson
- `TechLead`: Mike Johnson, Emily Chen
- `GitHubOrg`: mycompany, opensource-org

**Technical Variables:**
- `RuntimeEnvironment`: Node.js, Python, Java
- `PackageManager`: npm, yarn, pip
- `DatabaseSystem`: PostgreSQL, MongoDB, MySQL 