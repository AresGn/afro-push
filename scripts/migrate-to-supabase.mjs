import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ES modules compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Initialize Prisma client (your current DB)
const prisma = new PrismaClient();

// Initialize Supabase client (your target DB)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
  try {
    console.log('Starting migration to Supabase...');
    
    // Migrate users
    console.log('Migrating users...');
    const users = await prisma.user.findMany({
      include: {
        creatorProfile: true,
        advertiserProfile: true,
      }
    });
    
    console.log(`Found ${users.length} users to migrate.`);
    
    for (const user of users) {
      console.log(`Migrating user ${user.id} (${user.email})...`);
      
      // Insert into Supabase users table with same IDs to maintain relations
      const { error: userError } = await supabase
        .from('users')
        .insert({
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          created_at: user.createdAt,
          updated_at: user.updatedAt,
          password: user.password, 
        });
      
      if (userError) {
        console.error(`Error migrating user ${user.id}:`, userError);
        continue;
      }
      
      // Migrate creator profile if exists
      if (user.creatorProfile) {
        console.log(`Migrating creator profile for user ${user.id}...`);
        const { error: creatorError } = await supabase
          .from('creator_profiles')
          .insert({
            id: user.creatorProfile.id,
            user_id: user.id,
            bio: user.creatorProfile.bio,
            social_links: user.creatorProfile.socialLinks,
            categories: user.creatorProfile.categories,
            audience: user.creatorProfile.audience,
            created_at: user.creatorProfile.createdAt,
            updated_at: user.creatorProfile.updatedAt,
          });
        
        if (creatorError) {
          console.error(`Error migrating creator profile for user ${user.id}:`, creatorError);
        }
      }
      
      // Migrate advertiser profile if exists
      if (user.advertiserProfile) {
        console.log(`Migrating advertiser profile for user ${user.id}...`);
        const { error: advertiserError } = await supabase
          .from('advertiser_profiles')
          .insert({
            id: user.advertiserProfile.id,
            user_id: user.id,
            company_name: user.advertiserProfile.companyName,
            industry: user.advertiserProfile.industry,
            budget: user.advertiserProfile.budget,
            created_at: user.advertiserProfile.createdAt,
            updated_at: user.advertiserProfile.updatedAt,
          });
        
        if (advertiserError) {
          console.error(`Error migrating advertiser profile for user ${user.id}:`, advertiserError);
        }
      }
    }
    
    // Code pour sessions, accounts, verification tokens...
    // Ajoutez le reste du code de migration ici
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 