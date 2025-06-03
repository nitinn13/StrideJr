project-root/
├── prisma/
│   ├── schema.prisma
│   └── migrations/…
│
├── src/
│   ├── config/
│   │   ├── env.ts
│   │   ├── prisma.ts
│   │   └── supabaseClient.ts (if you need REST or Storage calls)
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── teacher.controller.ts
│   │   ├── parent.controller.ts
│   │   ├── admin.controller.ts
│   │   └── superadmin.controller.ts
│   │
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── teacher.routes.ts
│   │   ├── parent.routes.ts
│   │   ├── admin.routes.ts
│   │   └── superadmin.routes.ts
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── teacher.service.ts
│   │   ├── parent.service.ts
│   │   ├── admin.service.ts
│   │   └── superadmin.service.ts
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts       // Verify JWT, extract userId/role/schoolId
│   │   ├── tenant.middleware.ts     // Ensure req.schoolId is set (from JWT or header)
│   │   ├── errorHandling.middleware.ts
│   │   └── validation.middleware.ts // Wrap Zod schemas
│   │
│   ├── schemas/
│   │   ├── auth.schema.ts           // Zod schemas for register/login
│   │   ├── teacher.schema.ts        // Zod schemas for teacher endpoints
│   │   ├── parent.schema.ts
│   │   ├── admin.schema.ts
│   │   └── superadmin.schema.ts
│   │
│   ├── utils/
│   │   ├── jwt.util.ts              // signToken, verifyToken helpers
│   │   ├── password.util.ts         // hashPassword, comparePassword
│   │   └── date.util.ts             // (if you need date formatting, etc.)
│   │
│   ├── types/
│   │   └── express.d.ts             // To extend Request with `user` or `schoolId`
│   │
│   ├── app.ts                       // Express app setup
│   └── server.ts                    // Starts HTTP server
│
├── .env
├── package.json
└── tsconfig.json


i cant do this again
