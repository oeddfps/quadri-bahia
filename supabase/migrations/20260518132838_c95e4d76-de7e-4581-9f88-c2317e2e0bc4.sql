INSERT INTO public.quadribahia_motos (ordem, nome)
SELECT g, 'Moto ' || g FROM generate_series(7, 20) g
WHERE NOT EXISTS (SELECT 1 FROM public.quadribahia_motos m WHERE m.ordem = g);