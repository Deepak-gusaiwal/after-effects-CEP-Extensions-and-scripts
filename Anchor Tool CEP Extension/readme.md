# Installation Guide

## Step 1: Enable CEP Debug Mode

Open **Registry Editor** and navigate to:

```text
Computer\HKEY_CURRENT_USER\Software\Adobe\CSXS.12
```

Create the following **String Values (REG_SZ)** if they do not already exist:

| Name            | Value |
| --------------- | ----- |
| PlayerDebugMode | 1     |
| LogLevel        | 6     |

> Note: If the `CSXS.12` key does not exist, create it manually under `Software\Adobe`.

---

## Step 2: Install the Extension

Copy the extension folder to the Adobe CEP Extensions directory:

```text
C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\
```

The final structure should look similar to:

```text
C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\YourExtensionName
```

---

## Step 3: Launch After Effects

Restart Adobe After Effects after installing the extension.

Once After Effects has opened:

```text
Window → Extensions → [Your Extension Name]
```

Select your extension from the Extensions menu to launch it.

---

## Troubleshooting

* Ensure `PlayerDebugMode` is set to `1`.
* Verify the extension folder is copied directly into the `extensions` directory and is not nested inside another folder.
* Restart After Effects after making any changes to the installation or registry settings.
* Confirm that the extension's `manifest.xml` file is located inside the `CSXS` folder.
