# Adobe After Effects CEP Extension

A CEP (Common Extensibility Platform) extension for Adobe After Effects.

## Compatibility

This extension supports Adobe After Effects versions that support CEP panels.

| After Effects Version | CEP Version | CSInterface.js |
| --------------------- | ----------- | -------------- |
| After Effects 2020    | CSXS 10     | CEP_10.x       |
| After Effects 2021    | CSXS 10     | CEP_10.x       |
| After Effects 2022    | CSXS 11     | CEP_11.x       |
| After Effects 2023    | CSXS 11     | CEP_11.x       |
| After Effects 2024    | CSXS 11     | CEP_11.x       |
| After Effects 2025    | CSXS 12     | CEP_12.x       |

---

## Step 1: Download the Correct CSInterface.js

Download the appropriate CEP package from:

https://github.com/Adobe-CEP/CEP-Resources

Replace the existing file:

```text
js/CSInterface.js
```

with the version matching your After Effects installation.

### Examples

| After Effects Version | CSInterface.js Source   |
| --------------------- | ----------------------- |
| AE 2025               | CEP_12.x/CSInterface.js |
| AE 2024               | CEP_11.x/CSInterface.js |
| AE 2020               | CEP_10.x/CSInterface.js |

---

## Step 2: Update manifest.xml

Open:

```text
CSXS/manifest.xml
```

Locate the following line:

```xml
<RequiredRuntime Name="CSXS" Version="11.0"/>
```

Update the version to match your installed CEP version.

### Examples

```xml
<RequiredRuntime Name="CSXS" Version="12.0"/>
```

For After Effects 2025

```xml
<RequiredRuntime Name="CSXS" Version="10.0"/>
```

For After Effects 2020

---

## Step 3: Enable CEP Debug Mode

Open **Registry Editor** and navigate to:

### After Effects 2025

```text
Computer\HKEY_CURRENT_USER\Software\Adobe\CSXS.12
```

### After Effects 2020

```text
Computer\HKEY_CURRENT_USER\Software\Adobe\CSXS.10
```

Create the following **String Values (REG_SZ)** if they do not already exist:

| Name            | Value |
| --------------- | ----- |
| PlayerDebugMode | 1     |
| LogLevel        | 6     |

> If the required CSXS key does not exist, create it manually under:
>
> ```text
> HKEY_CURRENT_USER\Software\Adobe
> ```

---

## Step 4: Install the Extension

Copy the extension folder to:

```text
C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\
```

Example:

```text
C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\YourExtensionName
```

---

## Step 5: Launch the Extension

1. Restart Adobe After Effects.
2. Open:

```text
Window → Extensions → Your Extension Name
```

or, on some versions:

```text
Window → Extensions (Legacy) → Your Extension Name
```

---

## Troubleshooting

### Extension Does Not Appear

* Verify that `PlayerDebugMode` is set to `1`.
* Ensure the extension folder is copied directly into the CEP extensions directory.
* Make sure the extension folder is not nested inside another folder.
* Confirm that `manifest.xml` exists inside the `CSXS` directory.
* Restart After Effects after making changes to the registry or extension files.

### Extension Loads but Buttons Do Not Work

* Verify that the correct `CSInterface.js` version is being used.
* Check that the JSX files are located in the correct directory.
* Ensure all file paths referenced in the extension are valid.

### Development Tips

When modifying JSX scripts during development, reload the JSX file using:

```javascript
$.evalFile(...)
```

before executing any ExtendScript functions. This allows testing changes without restarting After Effects.

---

## Tested Environment

* Adobe After Effects 2025 (25.2.0 Build 131)
* CEP 12
* Windows 10 / Windows 11
