# Shyam Studio - Database Design

Shyam Studio uses Supabase as the database.

## Tables

The current database contains the following tables:

* `about_settings`
* `contact_messages`
* `contact_settings`
* `projects`
* `site_settings`

---

## 1. about_settings

Stores the content displayed in the About section.

| Column                | Type        |
| --------------------- | ----------- |
| id                    | uuid        |
| about_label           | text        |
| about_heading         | text        |
| about_description     | text        |
| feature_1_title       | text        |
| feature_1_description | text        |
| feature_2_title       | text        |
| feature_2_description | text        |
| feature_3_title       | text        |
| feature_3_description | text        |
| stat1_number          | text        |
| stat1_label           | text        |
| stat2_number          | text        |
| stat2_label           | text        |
| stat3_number          | text        |
| stat3_label           | text        |
| created_at            | timestamptz |
| updated_at            | timestamptz |

---

## 2. contact_messages

Stores messages submitted through the contact form.

| Column     | Type        |
| ---------- | ----------- |
| id         | int8        |
| created_at | timestamptz |
| name       | text        |
| email      | text        |
| subject    | text        |
| message    | text        |

---

## 3. contact_settings

Stores contact information and social media links displayed on the website.

| Column                   | Type        |
| ------------------------ | ----------- |
| id                       | uuid        |
| contact_label            | text        |
| contact_heading          | text        |
| contact_description      | text        |
| contact_info_description | text        |
| email                    | text        |
| phone                    | text        |
| location                 | text        |
| github_url               | text        |
| linkedin_url             | text        |
| instagram_url            | text        |
| created_at               | timestamptz |
| updated_at               | timestamptz |

---

## 4. projects

Stores software project information displayed in the portfolio.

| Column       | Type        |
| ------------ | ----------- |
| id           | int8        |
| title        | text        |
| description  | text        |
| image        | text        |
| category     | text        |
| technologies | text        |
| github       | text        |
| live_demo    | text        |
| featured     | bool        |
| created_at   | timestamptz |

---

## 5. site_settings

Stores the main Hero section content and links.

| Column                     | Type        |
| -------------------------- | ----------- |
| id                         | uuid        |
| hero_image                 | text        |
| hero_heading               | text        |
| hero_description           | text        |
| hero_primary_button_text   | text        |
| hero_primary_button_link   | text        |
| hero_secondary_button_text | text        |
| hero_secondary_button_link | text        |
| created_at                 | timestamptz |
| updated_at                 | timestamptz |

---

## Database Responsibilities

### about_settings

* About section content
* About features
* About statistics

### contact_messages

* Customer contact form submissions
* Name
* Email
* Subject
* Message

### contact_settings

* Contact section content
* Email
* Phone
* Location
* GitHub
* LinkedIn
* Instagram

### projects

* Project information
* Project image
* Category
* Technologies
* GitHub link
* Live demo link
* Featured project status

### site_settings

* Hero image
* Hero heading
* Hero description
* Primary button
* Secondary button

---

## Notes

* Supabase is used as the primary database.
* Project images are stored using the project's image URL/path.
* Settings tables are used to manage website content dynamically.
* The database structure may be expanded as new Shyam Studio features are added.
