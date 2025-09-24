// ts-node-dev ile çalıştır: npx ts-node scripts/seed.ts
import mongoose from "mongoose";
import { config } from "../src/core/utils/config";
import { UserModel } from "../src/modules/auth/user.model";
import { TenantModel } from "../src/modules/tenants/tenant.model";
import argon2 from "argon2";

async function run() {
  console.log("Seeding DB...", config);
  await mongoose.connect(config.MONGO_URI);
  const email = config.EMAIL;
  const pass = config.EMAIL_PASS;
  const passwordHash = await argon2.hash(pass);

  // önce user (tenant'sız)
  const user = await UserModel.create({ email, passwordHash, role: "owner", tenantId: new mongoose.Types.ObjectId() });

  // sonra tenant
  const tenant = await TenantModel.create({ name: "Demo Tenant", ownerId: user._id });

  // user’a gerçek tenantId’yi yaz
  user.tenantId = tenant._id.toString();
  await user.save();

  console.log("Seed OK");
  console.log({ email, pass, tenantId: tenant._id.toString() });

  await mongoose.disconnect();
}
run().catch(e => { console.error(e); process.exit(1); });