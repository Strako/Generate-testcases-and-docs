# Generate Test Cases and Documentation

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Configuration](#configuration)
7. [Data Structure](#data-structure)
8. [API Integration](#api-integration)
9. [Document Generation](#document-generation)
10. [Development](#development)
11. [Scripts](#scripts)
12. [Dependencies](#dependencies)
13. [Contributing](#contributing)
14. [License](#license)

## Overview

This TypeScript project automates the generation and management of test cases for Quality Assurance workflows. It provides functionality to:

- Import test cases to a Test Case Management System (TCMS)
- Generate professional Word documents (.docx) with formatted test cases
- Merge new test cases with existing documentation
- Support Gherkin format test case specifications

The project is designed for QA Engineers working with API testing, particularly focusing on user registration and validation scenarios.

## Features

- **Automated Test Case Import**: Upload test cases to TCMS via HTTP API
- **Document Generation**: Create formatted Word documents with test case tables
- **Document Merging**: Combine new test cases with existing documentation
- **Gherkin Format Support**: Structured test cases following BDD practices
- **TypeScript Implementation**: Type-safe development with modern ES modules
- **Configurable Test Data**: Easily modify test cases and titles through data files

## Project Structure

```
├── src/
│   ├── data/
│   │   ├── data.ts          # Test case data for document generation
│   │   ├── testcases.ts     # Test case data for TCMS import
│   │   └── titles.ts        # Document section titles
│   ├── doc-utils.ts         # Document generation utilities
│   ├── import-test-cases.ts # TCMS import functionality
│   └── index.ts            # Main application entry point
├── original.docx           # Base document for merging
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── prompts_unstyled.md    # QA Engineer profile and guidelines
```

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Strako/Generate-testcases-and-docs.git
   cd Generate-testcases-and-docs
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Build the project**:
   ```bash
   npm run build
   ```

## Usage

### Running the Application

Execute the main workflow that imports test cases and generates documentation:

```bash
npm start
```

This command will:

1. Import all test cases to the configured TCMS
2. Generate a new Word document with formatted test cases
3. Merge with existing documentation if `original.docx` exists

### Development Mode

For development with auto-rebuild on file changes:

```bash
npm run watch
```

## Configuration

### TCMS Integration

Configure the TCMS connection in `src/import-test-cases.ts`:

```typescript
const csrfmiddlewaretoken = "your-csrf-token";
const csrftoken = "your-csrf-token";
const default_tester = "your-username";
const product_id = "1";
const category_id = "1";
```

### SSL Configuration

The application disables SSL verification for development:

```typescript
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
```

**Note**: Remove this in production environments.

## Data Structure

### Test Case Format

Test cases follow this structure:

```typescript
interface TestCase {
  title: string; // Test case identifier and title
  description: string; // Feature and scenario description
  test_case: string; // Gherkin steps (Given/When/Then)
  test_type: string; // Type: "Happy Path", "Validación Negativa", etc.
  isFirst: boolean; // Indicates if this starts a new section
}
```

### Example Test Case

```typescript
{
  title: "[AUT:001] - Registrar usuario exitosamente con datos válidos",
  description: "Feature: Registro de usuarios\nScenario: Registro exitoso con datos válidos",
  test_case: "Given: El administrador tiene un usuario con datos válidos\nWhen: Se envía la petición POST al endpoint /api/v1/usuarios\nThen: El sistema guarda el usuario\nAnd: Devuelve una respuesta con estado 201",
  test_type: "Happy Path",
  isFirst: true
}
```

## API Integration

### TCMS Upload

The system uploads test cases to a TCMS via HTTP POST requests with the following features:

- **Authentication**: Uses CSRF tokens and session cookies
- **Batch Processing**: Processes multiple test cases sequentially
- **Error Handling**: Provides detailed error messages for failed uploads
- **Configurable Headers**: Supports custom request headers and cookies

### Request Format

Test cases are submitted with these fields:

- Summary and description
- Author and tester assignment
- Product and category classification
- Priority and status settings
- Email notification preferences

## Document Generation

### Word Document Features

- **Professional Formatting**: Styled tables with headers and consistent layout
- **Automatic Numbering**: Sequential test case IDs starting from 1228
- **Section Organization**: Grouped by titles with heading styles
- **Table Structure**: Each test case includes:
  - ID header with blue background
  - Title, Description, Test Case, and Test Type rows

### Document Merging

The system can merge new test cases with existing documents:

1. **Reads Original**: Loads existing `original.docx` file
2. **Generates New Content**: Creates formatted test case tables
3. **Merges Documents**: Combines content with page breaks
4. **Preserves Formatting**: Maintains original document styling
5. **Outputs Result**: Saves as `final_document.docx`

## Development

### Code Quality

The project includes:

- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting
- **TypeScript**: Type checking and modern JavaScript features
- **Strict Mode**: Enhanced type safety

### Build Process

Uses esbuild for fast compilation:

- **Bundling**: Single output file generation
- **External Dependencies**: Excludes Node.js built-ins and specific packages
- **ES Modules**: Modern module format support
- **Watch Mode**: Development-friendly auto-rebuild

## Scripts

| Script          | Description                        |
| --------------- | ---------------------------------- |
| `npm start`     | Run the compiled application       |
| `npm run build` | Build the project for production   |
| `npm run watch` | Development mode with auto-rebuild |
| `npm test`      | Run tests (placeholder)            |

## Dependencies

### Production Dependencies

- **docx**: Word document generation and manipulation
- **docxtemplater**: Document templating (if needed)
- **pizzip**: ZIP file handling for DOCX manipulation
- **node-fetch**: HTTP client for API requests

### Development Dependencies

- **TypeScript**: Language and compiler
- **esbuild**: Fast build tool
- **ESLint**: Code linting
- **Prettier**: Code formatting

## Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/new-feature`
3. **Make changes** and ensure code quality
4. **Run tests** and verify functionality
5. **Submit a pull request** with detailed description

### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier configurations
- Include type annotations for public APIs
- Write descriptive commit messages

## License

This project is licensed under the ISC License. See the repository for more details.

---

**Repository**: [Generate-testcases-and-docs](https://github.com/Strako/Generate-testcases-and-docs)

**Issues**: [Report bugs or request features](https://github.com/Strako/Generate-testcases-and-docs/issues)
