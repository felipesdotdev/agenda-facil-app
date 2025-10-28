import { db } from "./index";
import { service } from "./schema/service";
import { setting } from "./schema/setting";

export async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Seed Services
    console.log("Creating services...");
    const existingServices = await db.select().from(service);

    if (existingServices.length === 0) {
      await db.insert(service).values([
        {
          name: "Declaração de Imposto de Renda",
          description: "Declaração completa de IRPF",
          duration: 60,
          displayOrder: 1,
        },
        {
          name: "Abertura de Empresa",
          description: "Abertura de empresa com todos os documentos",
          duration: 90,
          displayOrder: 2,
        },
        {
          name: "Consultoria Fiscal",
          description: "Consultoria personalizada em questões fiscais",
          duration: 60,
          displayOrder: 3,
        },
        {
          name: "Contabilidade Mensal",
          description: "Serviços contábeis mensais",
          duration: 45,
          displayOrder: 4,
        },
      ]);
      console.log("✅ Services created");
    } else {
      console.log("⚠️ Services already exist, skipping...");
    }

    // Seed Settings
    console.log("Creating settings...");
    const existingSettings = await db.select().from(setting);

    if (existingSettings.length === 0) {
      await db.insert(setting).values([
        {
          key: "business_hours_start",
          value: "8",
          type: "number",
          description: "Horário de início do expediente",
        },
        {
          key: "business_hours_end",
          value: "18",
          type: "number",
          description: "Horário de fim do expediente",
        },
        {
          key: "business_days",
          value: "[1,2,3,4,5]",
          type: "json",
          description:
            "Dias da semana em que o escritório funciona (1=Segunda, 5=Sexta)",
        },
        {
          key: "slot_duration",
          value: "60",
          type: "number",
          description: "Duração padrão dos agendamentos em minutos",
        },
        {
          key: "booking_advance_days",
          value: "30",
          type: "number",
          description: "Quantos dias à frente é possível agendar",
        },
        {
          key: "booking_min_notice_hours",
          value: "24",
          type: "number",
          description: "Antecedência mínima em horas para agendar",
        },
      ]);
      console.log("✅ Settings created");
    } else {
      console.log("⚠️ Settings already exist, skipping...");
    }

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run seed if this file is executed directly
if (import.meta.main) {
  seed()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
