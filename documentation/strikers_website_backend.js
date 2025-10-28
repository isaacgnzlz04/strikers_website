// 🚀 Airtable Scripting: Create "Strikers Website Backend" Base Structure
// -------------------------------------------------------------
// Author: ChatGPT (GPT-5)
// This script creates all tables and fields for Strikers Website Backend

let base = base;

// Helper function to create tables
async function createTable(tableName, fields) {
    output.text(`🧱 Creating table: ${tableName}`);
    await base.createTableAsync(tableName, fields);
}

// --- 1. Users/Members ---
await createTable("Users/Members", [
    { name: "Email", type: "email" },
    { name: "First Name", type: "singleLineText" },
    { name: "Last Name", type: "singleLineText" },
    { name: "Phone Number", type: "phoneNumber" },
    { name: "Date Joined", type: "createdTime" },
    { name: "Member Status", type: "singleSelect", options: { choices: [
        { name: "Active" }, { name: "Inactive" }, { name: "Pending" }
    ]}},
    { name: "Mailchimp Subscriber ID", type: "singleLineText" },
    { name: "Newsletter Opted In", type: "checkbox" }
]);

// --- 2. Bookings ---
await createTable("Bookings", [
    { name: "User Email", type: "email" },
    { name: "User Name", type: "singleLineText" },
    { name: "User Phone", type: "phoneNumber" },
    { name: "Service", type: "multipleRecordLinks", options: { linkedTableId: null } }, // link manually after Booking Types is created
    { name: "Service Name", type: "singleLineText" },
    { name: "Date", type: "date" },
    { name: "Time Slot", type: "singleLineText" },
    { name: "Status", type: "singleSelect", options: { choices: [
        { name: "Confirmed" }, { name: "Pending" }, { name: "Cancelled" }, { name: "Completed" }
    ]}},
    { name: "Payment Status", type: "singleSelect", options: { choices: [
        { name: "Paid" }, { name: "Pending" }, { name: "Refunded" }
    ]}},
    { name: "Notes", type: "longText" },
    { name: "Created Date", type: "createdTime" },
    { name: "Modified Date", type: "lastModifiedTime" }
]);

// --- 3. Booking Types/Services ---
await createTable("Booking Types/Services", [
    { name: "Service Name", type: "singleLineText" },
    { name: "Description", type: "longText" },
    { name: "Duration", type: "number" },
    { name: "Price", type: "currency" },
    { name: "Capacity", type: "number" },
    { name: "Active", type: "checkbox" }
]);

// --- 4. Availability/Schedule ---
await createTable("Availability/Schedule", [
    { name: "Service", type: "multipleRecordLinks", options: { linkedTableId: null } },
    { name: "Date", type: "date" },
    { name: "Start Time", type: "singleLineText" },
    { name: "End Time", type: "singleLineText" },
    { name: "Available Spots", type: "number" },
    { name: "Booked Spots", type: "number" },
    { name: "Status", type: "formula", options: { formula: 'IF({Booked Spots} >= {Available Spots}, "Full", "Available")' } }
]);

// --- 5. Email Logs ---
await createTable("Email Logs", [
    { name: "Email", type: "email" },
    { name: "Email Type", type: "singleSelect", options: { choices: [
        { name: "Welcome" }, { name: "Booking Confirmation" }, { name: "Reminder" }, { name: "Newsletter" }
    ]}},
    { name: "Sent Date", type: "createdTime" },
    { name: "Status", type: "singleSelect", options: { choices: [
        { name: "Sent" }, { name: "Failed" }, { name: "Pending" }
    ]}},
    { name: "Mailchimp Campaign ID", type: "singleLineText" }
]);

// --- 6. Website Content ---
await createTable("Website Content", [
    { name: "Page Name", type: "singleSelect", options: { choices: [
        { name: "Home" }, { name: "About" }, { name: "Services" }, { name: "Contact" }
    ]}},
    { name: "Section Name", type: "singleLineText" },
    { name: "Content Type", type: "singleSelect", options: { choices: [
        { name: "Text" }, { name: "Image" }, { name: "Video" }, { name: "Banner" }
    ]}},
    { name: "Content Body", type: "longText" },
    { name: "Media URL", type: "url" },
    { name: "Display Order", type: "number" },
    { name: "Active", type: "checkbox" },
    { name: "Last Updated", type: "lastModifiedTime" }
]);

// --- 7. News/Announcements ---
await createTable("News/Announcements", [
    { name: "Title", type: "singleLineText" },
    { name: "Body", type: "longText" },
    { name: "Featured Image", type: "multipleAttachments" },
    { name: "Author", type: "singleLineText" },
    { name: "Published Date", type: "date" },
    { name: "Status", type: "singleSelect", options: { choices: [
        { name: "Draft" }, { name: "Published" }, { name: "Archived" }
    ]}},
    { name: "Category", type: "multipleSelects", options: { choices: [
        { name: "News" }, { name: "Events" }, { name: "Updates" }, { name: "Promotions" }
    ]}}
]);

// --- 8. Events/Programs ---
await createTable("Events/Programs", [
    { name: "Event Name", type: "singleLineText" },
    { name: "Description", type: "longText" },
    { name: "Start Date", type: "date" },
    { name: "End Date", type: "date" },
    { name: "Location", type: "singleLineText" },
    { name: "Capacity", type: "number" },
    { name: "Registered Count", type: "number" },
    { name: "Price", type: "currency" },
    { name: "Images", type: "multipleAttachments" },
    { name: "Status", type: "singleSelect", options: { choices: [
        { name: "Upcoming" }, { name: "Ongoing" }, { name: "Completed" }, { name: "Cancelled" }
    ]}}
]);

// --- 9. Contact/Inquiry Forms ---
await createTable("Contact/Inquiry Forms", [
    { name: "Name", type: "singleLineText" },
    { name: "Email", type: "email" },
    { name: "Phone", type: "phoneNumber" },
    { name: "Subject", type: "singleSelect", options: { choices: [
        { name: "General" }, { name: "Booking" }, { name: "Membership" }, { name: "Complaint" }, { name: "Other" }
    ]}},
    { name: "Message", type: "longText" },
    { name: "Status", type: "singleSelect", options: { choices: [
        { name: "New" }, { name: "In Progress" }, { name: "Resolved" }, { name: "Closed" }
    ]}},
    { name: "Assigned To", type: "singleLineText" },
    { name: "Submitted Date", type: "createdTime" }
]);

// --- 10. Testimonials/Reviews ---
await createTable("Testimonials/Reviews", [
    { name: "User Email", type: "email" },
    { name: "User Name", type: "singleLineText" },
    { name: "Rating", type: "number" },
    { name: "Review Text", type: "longText" },
    { name: "Service/Event", type: "multipleRecordLinks", options: { linkedTableId: null } },
    { name: "Status", type: "singleSelect", options: { choices: [
        { name: "Pending" }, { name: "Approved" }, { name: "Rejected" }
    ]}},
    { name: "Display on Website", type: "checkbox" },
    { name: "Submitted Date", type: "createdTime" }
]);

// --- 11. Staff/Instructors ---
await createTable("Staff/Instructors", [
    { name: "Name", type: "singleLineText" },
    { name: "Role", type: "singleSelect", options: { choices: [
        { name: "Manager" }, { name: "Staff" }, { name: "Instructor" }, { name: "Admin" }
    ]}},
    { name: "Email", type: "email" },
    { name: "Phone", type: "phoneNumber" },
    { name: "Bio", type: "longText" },
    { name: "Photo", type: "multipleAttachments" },
    { name: "Availability", type: "longText" },
    { name: "Active", type: "checkbox" }
]);

// --- 12. Pricing/Packages ---
await createTable("Pricing/Packages", [
    { name: "Package Name", type: "singleLineText" },
    { name: "Description", type: "longText" },
    { name: "Price", type: "currency" },
    { name: "Duration", type: "singleLineText" },
    { name: "Features", type: "longText" },
    { name: "Active", type: "checkbox" },
    { name: "Display Order", type: "number" }
]);

// --- 13. Gallery/Media ---
await createTable("Gallery/Media", [
    { name: "Title", type: "singleLineText" },
    { name: "Description", type: "longText" },
    { name: "Media File", type: "multipleAttachments" },
    { name: "Category", type: "multipleSelects", options: { choices: [
        { name: "Facility" }, { name: "Events" }, { name: "Leagues" }, { name: "Parties" }, { name: "Staff" }
    ]}},
    { name: "Upload Date", type: "createdTime" },
    { name: "Display on Website", type: "checkbox" },
    { name: "Display Order", type: "number" }
]);

// --- 14. Waitlist ---
await createTable("Waitlist", [
    { name: "User Email", type: "email" },
    { name: "User Name", type: "singleLineText" },
    { name: "Service/Event", type: "multipleRecordLinks", options: { linkedTableId: null } },
    { name: "Requested Date", type: "date" },
    { name: "Priority", type: "number" },
    { name: "Status", type: "singleSelect", options: { choices: [
        { name: "Active" }, { name: "Notified" }, { name: "Converted" }, { name: "Cancelled" }
    ]}},
    { name: "Added Date", type: "createdTime" }
]);

// --- 15. Settings/Configuration ---
await createTable("Settings/Configuration", [
    { name: "Setting Value", type: "longText" },
    { name: "Category", type: "singleSelect", options: { choices: [
        { name: "General" }, { name: "Email" }, { name: "Booking" }, { name: "Payments" }, { name: "Social" }
    ]}},
    { name: "Description", type: "longText" },
    { name: "Last Modified", type: "lastModifiedTime" }
]);

output.markdown("✅ **All tables created successfully!**\nYou can now link fields manually where needed (e.g., Bookings → Booking Types).");
