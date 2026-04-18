-- AlterTable
ALTER TABLE "BadgeItem" ADD COLUMN "description" TEXT;

-- CreateTable
CREATE TABLE "TemplateItem" (
    "templateId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("templateId", "itemId"),
    CONSTRAINT "TemplateItem_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "BadgeTemplate" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TemplateItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "BadgeItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PrintJob" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'QUEUED',
    "imageUrl" TEXT,
    "errorCode" INTEGER,
    "errorMsg" TEXT,
    "copies" INTEGER NOT NULL DEFAULT 1,
    "duplex" BOOLEAN NOT NULL DEFAULT false,
    "colorMode" TEXT NOT NULL DEFAULT 'Vivid',
    "dpi" TEXT NOT NULL DEFAULT '300x600',
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PrinterTelemetry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "printerModel" TEXT NOT NULL DEFAULT '',
    "serialNumber" TEXT NOT NULL DEFAULT '',
    "firmwareVersion" TEXT NOT NULL DEFAULT '',
    "printerStatus" TEXT NOT NULL DEFAULT 'Offline',
    "connectionType" TEXT NOT NULL DEFAULT 'USB',
    "ribbonType" TEXT NOT NULL DEFAULT '',
    "ribbonRemaining" INTEGER NOT NULL DEFAULT 0,
    "ribbonPartNumber" TEXT NOT NULL DEFAULT '',
    "ribbonSerialNumber" TEXT NOT NULL DEFAULT '',
    "totalCompleted" INTEGER NOT NULL DEFAULT 0,
    "totalPicked" INTEGER NOT NULL DEFAULT 0,
    "totalRejected" INTEGER NOT NULL DEFAULT 0,
    "totalLost" INTEGER NOT NULL DEFAULT 0,
    "currentCompleted" INTEGER NOT NULL DEFAULT 0,
    "currentPicked" INTEGER NOT NULL DEFAULT 0,
    "currentRejected" INTEGER NOT NULL DEFAULT 0,
    "cardsSinceClean" INTEGER NOT NULL DEFAULT 0,
    "cleaningsRun" INTEGER NOT NULL DEFAULT 0,
    "hopper1Status" TEXT NOT NULL DEFAULT 'Unknown',
    "exceptionStatus" TEXT NOT NULL DEFAULT 'Unknown',
    "colorMode" TEXT NOT NULL DEFAULT 'Vivid',
    "cardsVirtualStock" INTEGER NOT NULL DEFAULT 0,
    "cardsPrintedSite" INTEGER NOT NULL DEFAULT 0,
    "lastUpdated" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BadgeTemplate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bgImageUrl" TEXT NOT NULL,
    "configJson" TEXT NOT NULL,
    "basePrice" REAL NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "BadgeTemplate_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BadgeTemplate" ("bgImageUrl", "configJson", "createdAt", "eventId", "id", "isActive", "name") SELECT "bgImageUrl", "configJson", "createdAt", "eventId", "id", "isActive", "name" FROM "BadgeTemplate";
DROP TABLE "BadgeTemplate";
ALTER TABLE "new_BadgeTemplate" RENAME TO "BadgeTemplate";
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "badgeTemplateId" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "phone" TEXT NOT NULL DEFAULT '',
    "congregation" TEXT,
    "photoUrl" TEXT,
    "customConfigJson" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "totalAmount" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Order_badgeTemplateId_fkey" FOREIGN KEY ("badgeTemplateId") REFERENCES "BadgeTemplate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("badgeTemplateId", "clientName", "congregation", "createdAt", "eventId", "id", "status", "totalAmount", "updatedAt") SELECT "badgeTemplateId", "clientName", "congregation", "createdAt", "eventId", "id", "status", "totalAmount", "updatedAt" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
