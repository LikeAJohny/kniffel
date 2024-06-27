#!/usr/bin/env bash

ENV_TMPL=".env.dist"
ENV_FILE=".env"

cp $ENV_TMPL $ENV_FILE

sed -i "s|###ORIGIN###|${ORIGIN-https://kniffel.local}|g" $ENV_FILE
sed -i "s|###PUBLIC_SUPABASE_URL###|${PUBLIC_SUPABASE_URL}|g" $ENV_FILE
sed -i "s|###PUBLIC_SUPABASE_ANON_KEY###|${PUBLIC_SUPABASE_ANON_KEY}|g" $ENV_FILE

exec "${@}"
