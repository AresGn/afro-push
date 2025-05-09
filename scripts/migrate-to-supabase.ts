import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '../.env' });

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
    
    for (const user of users) {
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
          password: user.password, // Note: consider hashing/security
        });
      
      if (userError) {
        console.error(`Error migrating user ${user.id}:`, userError);
        continue;
      }
      
      // Migrate creator profile if exists
      if (user.creatorProfile) {
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
    
    // Migrate sessions
    console.log('Migrating sessions...');
    const sessions = await prisma.session.findMany();
    
    for (const session of sessions) {
      const { error: sessionError } = await supabase
        .from('sessions')
        .insert({
          id: session.id,
          user_id: session.userId,
          session_token: session.sessionToken,
          expires: session.expires,
        });
      
      if (sessionError) {
        console.error(`Error migrating session ${session.id}:`, sessionError);
      }
    }
    
    // Migrate accounts (OAuth connections)
    console.log('Migrating accounts...');
    const accounts = await prisma.account.findMany();
    
    for (const account of accounts) {
      const { error: accountError } = await supabase
        .from('accounts')
        .insert({
          id: account.id,
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        });
      
      if (accountError) {
        console.error(`Error migrating account ${account.id}:`, accountError);
      }
    }
    
    // Migrate verification tokens
    console.log('Migrating verification tokens...');
    const verificationTokens = await prisma.verificationToken.findMany();
    
    for (const token of verificationTokens) {
      const { error: tokenError } = await supabase
        .from('verification_tokens')
        .insert({
          identifier: token.identifier,
          token: token.token,
          expires: token.expires,
        });
      
      if (tokenError) {
        console.error(`Error migrating verification token for ${token.identifier}:`, tokenError);
      }
    }
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 