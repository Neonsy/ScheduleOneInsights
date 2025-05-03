# 🔄 Contributing to ScheduleOneInsights

> _A guide to our branching strategy and code contribution workflow_

> [!NOTE]
> This is a guide, helper, and an overview. Not everything may be strictly followed all of the time.

## 🌳 Branch Structure

ScheduleOneInsights follows a structured branching strategy to ensure code quality and maintain a stable production environment.
Our repository has three primary branches, each serving a specific purpose in our development pipeline:

### Main Branch (`main`)

-   **Purpose**: Production-ready code that powers the live public website
-   **Stability**: Highest - only thoroughly tested and approved code
-   **Deployment**: Automatically deployed to the production environment
-   **Access**: Protected; only accepts PRs from the Preview branch

### Preview Branch (`Preview`)

-   **Purpose**: Pre-production testing environment
-   **Stability**: High - features are complete and integration-tested
-   **Deployment**: Automatically deployed to the preview/staging website
-   **Access**: Protected; only accepts PRs from the Dev branch
-   **Testing**: All CI/CD checks must pass before merging to Main

### Development Branch (`Dev`)

-   **Purpose**: Integration of completed features and work-in-progress
-   **Stability**: Moderate - features may be partially complete
-   **Deployment**: Not automatically deployed
-   **Access**: Protected; accepts PRs from feature branches
-   **Testing**: Basic checks must pass before merging to Preview

## 🔄 Contribution Workflow

### 1. Starting a New Feature

When working on a new feature or bug fix:

1. **Create a Feature Branch**:

    ```bash
    git checkout Dev
    git pull origin Dev
    git checkout -b feature/your-feature-name
    ```

2. **Naming Convention**:

    - `feature/descriptive-name` - For new features
    - `bugfix/issue-description` - For bug fixes
    - `docs/documentation-update` - For documentation changes
    - `refactor/component-name` - For code refactoring

3. **Work on Your Changes**:
    - Make commits with clear, descriptive messages
    - Keep changes focused on a single purpose
    - Follow the project's coding standards

### 2. Submitting Your Work

When your feature is ready:

1. **Create a Pull Request to Dev**:

    - Open a PR from your feature branch to the `Dev` branch
    - Provide a clear description of the changes
    - Reference any related issues

2. **Code Review**:

    - At least one approval is required
    - Address any feedback or requested changes
    - Ensure all discussions are resolved before merging

3. **Merge to Dev**:
    - Once approved, your PR will be merged into the `Dev` branch
    - Your feature is now part of the development integration environment

### 3. Promotion to Preview

Features in the `Dev` branch are periodically promoted to `Preview`:

1. **Create a Pull Request from Dev to Preview**:

    - Only maintainers should create this PR
    - This PR should include multiple completed features
    - All features should be tested together

2. **Integration Testing**:

    - Comprehensive testing is performed in the Preview environment
    - CI/CD pipeline runs all tests and checks
    - Any issues found must be fixed before proceeding

3. **Preview Deployment**:
    - Once merged to `Preview`, changes are automatically deployed to the preview website
    - Stakeholders can review the changes in a production-like environment

### 4. Release to Production

When the `Preview` branch is stable and ready for production:

1. **Create a Pull Request from Preview to Main**:

    - Only maintainers should create this PR
    - This represents a production release
    - All tests and checks must pass

2. **Final Review**:

    - Final approval is required
    - Release notes should be prepared

3. **Production Deployment**:
    - Once merged to `Main`, changes are automatically deployed to the public website
    - The release is monitored for any issues

## 🔍 Code Review Guidelines

When reviewing code, consider:

-   Does the code follow project standards?
-   Is the code well-tested? (Proof outside test tools is also valid)
-   Is the implementation efficient and maintainable? (Non strict, but should be loosely followed)
-   Is documentation adequate? (Comments and Docstring)
-   Are there any security concerns?

## 🚀 Future CI/CD Pipeline

We are in the process of implementing GitHub Workflow actions for our CI/CD pipeline.
Once implemented, these will include:

-   **Automated Testing**: Unit tests, integration tests, and end-to-end tests
-   **Code Quality Checks**: Linting, formatting, and static analysis
-   **Security Scanning**: Dependency vulnerability checks
-   **Performance Testing** (If needed): Ensuring changes don't negatively impact performance
-   **Automated Deployments**: To preview and production environments

## 🤝 Getting Help

If you need assistance with the contribution process:

-   Open an issue with your question
-   Reach out to project maintainers
-   Check the project documentation