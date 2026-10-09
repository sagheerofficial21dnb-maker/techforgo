<?php
/**
 * The template for displaying all pages
 *
 * @package TechForGo
 * @since 1.0.0
 */

get_header();
?>

<main id="primary" class="tfg-site-main">
	<div class="tfg-container">

		<?php get_template_part( 'template-parts/breadcrumbs' ); ?>

		<div class="tfg-layout-split">
			<div class="tfg-main-content">
				<?php
				while ( have_posts() ) :
					the_post();
					?>
					<article id="post-<?php the_ID(); ?>" <?php post_class( 'tfg-page-article' ); ?>>
						<header class="tfg-page-header">
							<h1 class="tfg-single-title"><?php the_title(); ?></h1>
						</header>

						<?php if ( has_post_thumbnail() ) : ?>
							<div class="tfg-single-hero-media">
								<?php the_post_thumbnail( 'techforgo-hero' ); ?>
							</div>
						<?php endif; ?>

						<div class="tfg-article-prose">
							<?php
							the_content();

							wp_link_pages(
								array(
									'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'techforgo' ),
									'after'  => '</div>',
								)
							);
							?>
						</div>
					</article>
					<?php
				endwhile;
				?>
			</div>

			<?php get_sidebar(); ?>
		</div>

	</div>
</main>

<?php
get_footer();
